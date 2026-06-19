'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { notify } from '@/components/Toaster';
import { confirmDialog } from '@/components/ConfirmDialog';
import { PERMISSION_PRESETS, matchPermissionPreset, type PermissionPreset } from '@/lib/permissions';

interface Label {
  id: string;
  name: string;
}

function sparklinePath(values: number[], w = 140, h = 36) {
  if (!values || values.length === 0) return '';
  const max = Math.max(...values, 1);
  const step = values.length > 1 ? w / (values.length - 1) : w;
  return values
    .map((v, i) => {
      const x = i * step;
      const y = h - (v / max) * (h - 4) - 2;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function AnimatedSparkline({
  values,
  color,
  width = 140,
  height = 36,
  withArea = true,
  animKey = ''
}: {
  values: number[];
  color: string;
  width?: number;
  height?: number;
  withArea?: boolean;
  animKey?: string;
}) {
  const pathD = sparklinePath(values, width, height);
  const pathKey = `${animKey}-${values.join(',')}`;
  const areaD = pathD ? `${pathD} L ${width} ${height} L 0 ${height} Z` : '';
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden style={{ display: 'block' }}>
      {withArea && areaD && (
        <motion.path
          key={`area-${pathKey}`}
          d={areaD}
          fill={color}
          fillOpacity={0.12}
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
      <motion.path
        key={`line-${pathKey}`}
        d={pathD || `M0 ${height} L${width} ${height}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </svg>
  );
}

interface Document {
  id: string;
  name: string;
  displayName: string | null;
  mimeType: string;
  status: string;
  createdAt: string;
  labels: Label[];
  permissions?: any[];
  userId: string;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#fafafa',
      color: '#64748b' 
    }}>Loading eDocs Workspace...</div>}>
      <DocumentManagementCenter />
    </Suspense>
  );
}

function DocumentManagementCenter() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const searchParams = useSearchParams();
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'DOCS' | 'DASHBOARD' | 'VAULT' | 'DEPT' | 'USERS' | 'REPORTS' | 'OVERSIGHT'>('DOCS');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const formatAuditDateInput = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const [auditDateFrom, setAuditDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return formatAuditDateInput(d);
  });
  const [auditDateTo, setAuditDateTo] = useState(() => formatAuditDateInput(new Date()));
  const [isAuditExporting, setIsAuditExporting] = useState(false);
  const [tenantSettings, setTenantSettings] = useState<any>({
    watermarkingEnabled: false,
    antiScreenshotBlur: false
  });
  const [isHighRiskFilterActive, setIsHighRiskFilterActive] = useState(false);
  const [isSwitchingDept, setIsSwitchingDept] = useState(false);
  // ADMIN-only: when true the DOCS view spans every department; when false it is
  // scoped to the currently active department. Ignored for non-admin users.
  const [adminViewAll, setAdminViewAll] = useState(true);

  const fetchFolders = async (allScope?: boolean) => {
    try {
      const useAll = allScope ?? (adminViewAll && currentUser?.role === 'ADMIN');
      const res = await fetch(`/api/folders${useAll ? '?all=1' : ''}`);
      if (res.ok) setFolders(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) setTenantSettings(await res.json());
    } catch (err) { console.error(err); }
  };

  const updateSetting = async (key: string, value: boolean) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });
      if (res.ok) setTenantSettings(await res.json());
    } catch (err) { console.error(err); }
  };

  const recordClientAudit = async (action: string, metadata: any = null, overrideUserId: string | null = null) => {
    try {
      const uId = overrideUserId || currentUser?.id;
      if (!uId) return;
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uId, action, metadata })
      });
      if (activeTab === 'VAULT') fetchAuditLogs();
    } catch (err) { console.error(err); }
  };

  const fetchAvailableDepts = async () => {
    try {
      const res = await fetch('/api/departments');
      if (res.ok) setAvailableDepts(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchUserAssignments = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}/departments`);
      if (res.ok) setUserAssignments(await res.json());
    } catch (err) { console.error(err); }
  };

  const saveAssignments = async () => {
    if (!selectedUserForAssignment) return;
    setIsAssignmentLoading(true);
    try {
      const res = await fetch(`/api/users/${selectedUserForAssignment.id}/departments`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          assignments: userAssignments.map(a => ({
            departmentId: a.departmentId,
            role: a.role,
            isPrimary: a.isPrimary,
            permissions: Array.isArray(a.permissionsList)
              ? a.permissionsList
              : (a.permissions ? String(a.permissions).split(',').map((p: string) => p.trim()).filter(Boolean) : undefined)
          }))
        })
      });
      if (res.ok) {
        setIsAssignmentPanelOpen(false);
        // If we updated ourselves, refresh auth
        if (selectedUserForAssignment.id === currentUser?.id) {
          initializeAuth();
        }
      }
    } catch (err) { console.error(err); }
    finally { setIsAssignmentLoading(false); }
  };
  
  const getLabelColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    return {
      base: `hsl(${h}, 60%, 65%)`,
      bg: `hsla(${h}, 60%, 65%, 0.1)`,
      border: `hsla(${h}, 60%, 65%, 0.3)`
    };
  };
  
  useEffect(() => {
    const docIdParam = searchParams.get('selectedDocId');
    if (docIdParam) {
      setSelectedDocId(docIdParam);
    }
  }, [searchParams]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Global (cross-system) search dropdown state
  const [globalResults, setGlobalResults] = useState<any[]>([]);
  const [globalSearchLoading, setGlobalSearchLoading] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [indexRebuilding, setIndexRebuilding] = useState(false);

  const rebuildSearchIndex = async () => {
    if (currentUser?.role !== 'ADMIN') return;
    setIndexRebuilding(true);
    try {
      const res = await fetch('/api/admin/index/rebuild', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        notify('success', `Rebuilt index: ${data.reindexed}/${data.total} documents.`);
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Index rebuild failed.');
      }
    } catch (err) {
      console.error('Index rebuild failed', err);
      notify('error', 'Network error during index rebuild.');
    } finally {
      setIndexRebuilding(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const HighlightText = ({ text, query }: { text: string | null, query: string }) => {
    if (!text) return null;
    if (!query.trim()) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <mark key={i} style={styles.highlight}>{part}</mark> 
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  };
  const [isUploading, setIsUploading] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [isEditingName, setIsEditingName] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [activeLogs, setActiveLogs] = useState<ActivityLog[]>([]);
  const [showLogsFor, setShowLogsFor] = useState<string | null>(null);
  const [menuDocId, setMenuDocId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'MINE' | 'SHARED' | 'TRASH'>('MINE');
  const [trashedFolders, setTrashedFolders] = useState<any[]>([]);
  const [trashRetentionDays, setTrashRetentionDays] = useState<number>(30);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharingDocId, setSharingDocId] = useState<string | null>(null);
  const [shareUserId, setShareUserId] = useState('');
  const [permissionLevel, setPermissionLevel] = useState<'VIEW' | 'EDIT'>('VIEW');
  const [ttlHours, setTtlHours] = useState<number>(0);
  const [shareExpiryDate, setShareExpiryDate] = useState<string>('');
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User Assignment State
  const [isAssignmentPanelOpen, setIsAssignmentPanelOpen] = useState(false);
  const [selectedUserForAssignment, setSelectedUserForAssignment] = useState<any>(null);
  const [availableDepts, setAvailableDepts] = useState<any[]>([]);
  const [userAssignments, setUserAssignments] = useState<any[]>([]);
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Admin reset-password modal state
  const [isAdminPwdModalOpen, setIsAdminPwdModalOpen] = useState(false);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<any>(null);
  const [adminPwdNew, setAdminPwdNew] = useState('');
  const [adminPwdConfirm, setAdminPwdConfirm] = useState('');
  const [adminPwdVisible, setAdminPwdVisible] = useState(false);
  const [adminPwdSubmitting, setAdminPwdSubmitting] = useState(false);
  const [adminPwdError, setAdminPwdError] = useState<string | null>(null);

  // Change Password modal state
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdSubmitting, setPwdSubmitting] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);

  const submitPasswordChange = async () => {
    setPwdError(null);
    if (pwdNew.length < 8) { setPwdError('New password must be at least 8 characters.'); return; }
    if (pwdNew !== pwdConfirm) { setPwdError('New password and confirmation do not match.'); return; }
    if (pwdNew === pwdCurrent) { setPwdError('New password must differ from your current password.'); return; }
    setPwdSubmitting(true);
    try {
      const res = await fetch('/api/me/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwdCurrent, newPassword: pwdNew, confirmPassword: pwdConfirm })
      });
      if (res.ok) {
        notify('success', 'Password changed. Other sessions have been signed out.');
        setIsChangePasswordOpen(false);
        setPwdCurrent(''); setPwdNew(''); setPwdConfirm('');
      } else {
        const data = await res.json().catch(() => ({}));
        setPwdError(data?.error || 'Failed to change password.');
      }
    } catch (err) {
      console.error(err);
      setPwdError('Network error while changing password.');
    } finally {
      setPwdSubmitting(false);
    }
  };

  const openAdminPasswordModal = (user: any) => {
    setSelectedUserForPassword(user);
    setAdminPwdNew('');
    setAdminPwdConfirm('');
    setAdminPwdVisible(false);
    setAdminPwdError(null);
    setIsAdminPwdModalOpen(true);
  };

  const submitAdminPasswordReset = async () => {
    if (!selectedUserForPassword) return;
    setAdminPwdError(null);
    if (adminPwdNew.length < 8) {
      setAdminPwdError('New password must be at least 8 characters.');
      return;
    }
    if (adminPwdNew !== adminPwdConfirm) {
      setAdminPwdError('New password and confirmation do not match.');
      return;
    }
    setAdminPwdSubmitting(true);
    try {
      const res = await fetch(`/api/users/${selectedUserForPassword.id}/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: adminPwdNew, confirmPassword: adminPwdConfirm })
      });
      if (res.ok) {
        notify('success', `Password reset for ${selectedUserForPassword.name}.`);
        setIsAdminPwdModalOpen(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setAdminPwdError(data?.error || 'Failed to reset password.');
      }
    } catch (err) {
      console.error('Admin password reset failed', err);
      setAdminPwdError('Network error while resetting password.');
    } finally {
      setAdminPwdSubmitting(false);
    }
  };

  // Folder kebab menu + rename/delete (ADMIN or folder owner)
  const [folderMenuId, setFolderMenuId] = useState<string | null>(null);

  const handleFolderRename = async (folder: any) => {
    const newName = window.prompt('Rename folder:', folder.name);
    if (!newName || newName === folder.name) return;
    try {
      const res = await fetch(`/api/folders/${folder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      if (res.ok) {
        const updated = await res.json();
        setFolders((prev: any[]) => prev.map(f => f.id === folder.id ? { ...f, name: updated.name } : f));
        recordClientAudit('FOLDER_RENAME', { folderId: folder.id, previousName: folder.name, newName });
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to rename folder.');
      }
    } catch (err) {
      console.error('Failed to rename folder', err);
      notify('error', 'Network error while renaming folder.');
    }
  };

  const handleFolderDelete = async (folder: any) => {
    const ok = await confirmDialog({
      title: 'Delete folder',
      message: `Delete folder "${folder.name}"? This cannot be undone.`,
      confirmLabel: 'Delete folder',
      cancelLabel: 'Keep folder',
      tone: 'danger'
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/folders/${folder.id}`, { method: 'DELETE' });
      if (res.ok) {
        setFolders((prev: any[]) => prev.filter(f => f.id !== folder.id));
        if (currentFolderId === folder.id) setCurrentFolderId(null);
        recordClientAudit('FOLDER_DELETE', { folderId: folder.id, folderName: folder.name });
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to delete folder.');
      }
    } catch (err) {
      console.error('Failed to delete folder', err);
      notify('error', 'Network error while deleting folder.');
    }
  };

  // Folder Sharing State (ADMIN)
  const [folderShareModalOpen, setFolderShareModalOpen] = useState(false);
  const [folderShareTarget, setFolderShareTarget] = useState<any>(null);
  const [folderShareUserId, setFolderShareUserId] = useState('');
  const [folderSharePermLevel, setFolderSharePermLevel] = useState<'VIEW' | 'EDIT'>('VIEW');
  const [folderShareTtlHours, setFolderShareTtlHours] = useState<number>(0);
  const [folderShareExpiryDate, setFolderShareExpiryDate] = useState<string>('');
  const [folderShareGrants, setFolderShareGrants] = useState<any[]>([]);
  const [folderShareLoading, setFolderShareLoading] = useState(false);
  const [folderShareError, setFolderShareError] = useState<string | null>(null);

  const openFolderShareModal = async (folder: any) => {
    setFolderShareTarget(folder);
    setFolderShareModalOpen(true);
    setFolderShareUserId('');
    setFolderSharePermLevel('VIEW');
    setFolderShareTtlHours(0);
    setFolderShareExpiryDate('');
    setFolderShareError(null);
    setFolderShareGrants([]);
    try {
      const res = await fetch(`/api/folders/${folder.id}/share`);
      if (res.ok) setFolderShareGrants(await res.json());
    } catch (err) { console.error('Failed to load folder grants', err); }
  };

  const submitFolderShare = async () => {
    if (!folderShareTarget) return;
    if (!folderShareUserId) {
      setFolderShareError('Pick a user to grant access.');
      return;
    }
    setFolderShareLoading(true);
    setFolderShareError(null);
    try {
      let expiresAtIso: string | null = null;
      if (folderShareExpiryDate) {
        const [y, m, d] = folderShareExpiryDate.split('-').map(Number);
        const dt = new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
        if (!isNaN(dt.getTime()) && dt.getTime() > Date.now()) {
          expiresAtIso = dt.toISOString();
        }
      }

      const res = await fetch(`/api/folders/${folderShareTarget.id}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sharedWithUserId: folderShareUserId,
          permissionLevel: folderSharePermLevel,
          expiresAt: expiresAtIso,
          ttlHours: !expiresAtIso && folderShareTtlHours ? folderShareTtlHours : 0
        })
      });
      if (res.ok) {
        const grant = await res.json();
        setFolderShareGrants(prev => {
          const others = prev.filter(g => g.sharedWithUserId !== grant.sharedWithUserId);
          return [grant, ...others];
        });
        setFolderShareUserId('');
        setFolderShareTtlHours(0);
        setFolderShareExpiryDate('');
        recordClientAudit('FOLDER_SHARE', {
          folderId: folderShareTarget.id,
          folderName: folderShareTarget.name,
          sharedWithUserId: grant.sharedWithUserId,
          permissionLevel: grant.permissionLevel
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setFolderShareError(data?.error || 'Failed to share folder.');
      }
    } catch (err) {
      console.error('Failed to share folder', err);
      setFolderShareError('Network error while sharing folder.');
    } finally {
      setFolderShareLoading(false);
    }
  };

  const revokeFolderShare = async (sharedWithUserId: string) => {
    if (!folderShareTarget) return;
    try {
      const res = await fetch(`/api/folders/${folderShareTarget.id}/share?userId=${encodeURIComponent(sharedWithUserId)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setFolderShareGrants(prev => prev.filter(g => g.sharedWithUserId !== sharedWithUserId));
        recordClientAudit('FOLDER_UNSHARE', { folderId: folderShareTarget.id, sharedWithUserId });
      }
    } catch (err) { console.error('Failed to revoke folder share', err); }
  };

  // Department Creation State (ADMIN)
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptPresetId, setNewDeptPresetId] = useState<string>('');
  const [isCreatingDept, setIsCreatingDept] = useState(false);
  const [deptError, setDeptError] = useState<string | null>(null);
  const [deptPresetSaving, setDeptPresetSaving] = useState<string | null>(null);

  // User Creation State (ADMIN)
  type PermissionCode = 'VIEW' | 'EDIT' | 'DELETE' | 'PRINT' | 'UPLOAD' | 'SHARE';
  const ALL_PERMS: PermissionCode[] = ['VIEW', 'EDIT', 'DELETE', 'PRINT', 'UPLOAD', 'SHARE'];
  const PERMISSION_LABELS: Record<PermissionCode, string> = {
    VIEW: 'View',
    EDIT: 'Edit',
    DELETE: 'Delete',
    PRINT: 'Print',
    UPLOAD: 'Upload',
    SHARE: 'Share'
  };
  const permsForRole = (role: 'MEMBER' | 'HOD'): PermissionCode[] =>
    role === 'HOD' ? [...ALL_PERMS] : ['VIEW', 'UPLOAD'];

  type NewUserAssignment = {
    departmentId: string;
    role: 'MEMBER' | 'HOD';
    isPrimary: boolean;
    permissions: PermissionCode[];
  };
  const [newUserForm, setNewUserForm] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'ADMIN' | 'SUB_ADMIN' | 'HOD' | 'USER';
    assignments: NewUserAssignment[];
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    assignments: []
  });
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [userSuccess, setUserSuccess] = useState<string | null>(null);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  const resetNewUserForm = () => {
    setNewUserForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'USER',
      assignments: []
    });
    setUserError(null);
    setUserSuccess(null);
    setShowNewUserPassword(false);
  };

  const refreshUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const list = await res.json();
        setUsers(list);
      }
    } catch (err) { console.error('Failed to refresh users', err); }
  };

  const toggleNewUserAssignment = (deptId: string) => {
    setNewUserForm(prev => {
      const has = prev.assignments.find(a => a.departmentId === deptId);
      if (has) {
        const remaining = prev.assignments.filter(a => a.departmentId !== deptId);
        if (has.isPrimary && remaining.length > 0) remaining[0].isPrimary = true;
        return { ...prev, assignments: remaining };
      }
      // If the department has a default permission preset, seed the new
      // assignment with it; otherwise fall back to role-based defaults.
      const dept = availableDepts.find((d: any) => d.id === deptId);
      const presetId: string | undefined = dept?.defaultPermissionPreset || undefined;
      const preset = presetId ? PERMISSION_PRESETS.find(p => p.id === presetId) : null;
      const seedPerms = preset
        ? ([...preset.permissions] as PermissionCode[])
        : permsForRole('MEMBER');
      const newAssignment: NewUserAssignment = {
        departmentId: deptId,
        role: 'MEMBER',
        isPrimary: prev.assignments.length === 0,
        permissions: seedPerms
      };
      return { ...prev, assignments: [...prev.assignments, newAssignment] };
    });
  };

  const setNewUserAssignmentRole = (deptId: string, role: 'MEMBER' | 'HOD') => {
    setNewUserForm(prev => ({
      ...prev,
      assignments: prev.assignments.map(a =>
        a.departmentId === deptId
          ? { ...a, role, permissions: permsForRole(role) }
          : a
      )
    }));
  };

  const toggleNewUserPermission = (deptId: string, perm: PermissionCode) => {
    setNewUserForm(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => {
        if (a.departmentId !== deptId) return a;
        const has = a.permissions.includes(perm);
        let next = has ? a.permissions.filter(p => p !== perm) : [...a.permissions, perm];
        // VIEW is always required
        if (!next.includes('VIEW')) next = ['VIEW', ...next];
        return { ...a, permissions: next };
      })
    }));
  };

  const setNewUserPrimary = (deptId: string) => {
    setNewUserForm(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => ({ ...a, isPrimary: a.departmentId === deptId }))
    }));
  };

  const createUser = async () => {
    const { name, email, password, confirmPassword, role, assignments } = newUserForm;
    setUserError(null);
    setUserSuccess(null);

    if (!name.trim()) return setUserError('Name is required.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return setUserError('Enter a valid email address.');
    }
    if (password.length < 6) return setUserError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setUserError('Passwords do not match.');

    setIsCreatingUser(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          assignments: assignments.map(a => ({
            departmentId: a.departmentId,
            role: a.role,
            isPrimary: a.isPrimary,
            permissions: a.permissions
          }))
        })
      });
      if (res.ok) {
        const created = await res.json();
        await refreshUsers();
        setUserSuccess(`Created ${created.name} (${created.email}). They can now log in with the provided password.`);
        setNewUserForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'USER',
          assignments: []
        });
        recordClientAudit('USER_CREATE', { newUserId: created.id, email: created.email, role: created.role });
      } else {
        const data = await res.json().catch(() => ({}));
        setUserError(data?.error || 'Failed to create user.');
      }
    } catch (err) {
      console.error('Failed to create user', err);
      setUserError('Network error while creating user.');
    } finally {
      setIsCreatingUser(false);
    }
  };

  const setDepartmentDefaultPreset = async (deptId: string, presetId: string | null) => {
    setDeptPresetSaving(deptId);
    try {
      const res = await fetch(`/api/departments/${deptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ defaultPermissionPreset: presetId })
      });
      if (res.ok) {
        await fetchAvailableDepts();
        recordClientAudit('DEPARTMENT_PRESET_UPDATE', { departmentId: deptId, defaultPermissionPreset: presetId });
        notify('success', presetId ? `Default permission set updated.` : `Default permission set cleared.`);
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to update department.');
      }
    } catch (err) {
      console.error('Failed to update department preset', err);
      notify('error', 'Network error while updating department.');
    } finally {
      setDeptPresetSaving(null);
    }
  };

  const deleteDepartment = async (dept: { id: string; name: string; _count?: { folders?: number; documents?: number; users?: number } }) => {
    const folders = dept._count?.folders ?? 0;
    const documents = dept._count?.documents ?? 0;
    const members = dept._count?.users ?? 0;

    if (folders > 0 || documents > 0) {
      await confirmDialog({
        title: `Can’t delete “${dept.name}”`,
        message:
          `This department still has ${folders} folder${folders === 1 ? '' : 's'} and ` +
          `${documents} document${documents === 1 ? '' : 's'}. ` +
          `Move or delete that content first, then try again.`,
        confirmLabel: 'OK',
        cancelLabel: null,
        tone: 'warning'
      });
      return;
    }

    const memberWarning = members > 0
      ? ` ${members} member${members === 1 ? '' : 's'} will be unlinked from it (the user accounts themselves are kept).`
      : '';

    const ok = await confirmDialog({
      title: `Delete department “${dept.name}”?`,
      message: `This action can’t be undone.${memberWarning}`,
      confirmLabel: 'Delete department',
      cancelLabel: 'Cancel',
      tone: 'danger'
    });
    if (!ok) return;

    setDeptPresetSaving(dept.id);
    try {
      const res = await fetch(`/api/departments/${dept.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchAvailableDepts();
        recordClientAudit('DEPARTMENT_DELETE', { departmentId: dept.id, name: dept.name });
        notify('success', `Department “${dept.name}” deleted.`);
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.message || data?.error || 'Failed to delete department.');
      }
    } catch (err) {
      console.error('Failed to delete department', err);
      notify('error', 'Network error while deleting department.');
    } finally {
      setDeptPresetSaving(null);
    }
  };

  const createDepartment = async () => {
    const name = newDeptName.trim();
    if (!name) {
      setDeptError('Please enter a department name.');
      return;
    }
    setIsCreatingDept(true);
    setDeptError(null);
    try {
      const res = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          ...(newDeptPresetId ? { defaultPermissionPreset: newDeptPresetId } : {})
        })
      });
      if (res.ok) {
        setNewDeptName('');
        setNewDeptPresetId('');
        await fetchAvailableDepts();
        recordClientAudit('DEPARTMENT_CREATE', { name, defaultPermissionPreset: newDeptPresetId || null });
      } else {
        const data = await res.json().catch(() => ({}));
        setDeptError(data?.error || 'Failed to create department.');
      }
    } catch (err) {
      console.error('Failed to create department', err);
      setDeptError('Network error while creating department.');
    } finally {
      setIsCreatingDept(false);
    }
  };

  const [reportData, setReportData] = useState<any>(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportDeptId, setReportDeptId] = useState<string>('active');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [dashboardRange, setDashboardRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [dashboardLastUpdated, setDashboardLastUpdated] = useState<Date | null>(null);
  const [dashboardActivityFilter, setDashboardActivityFilter] =
    useState<'ALL' | 'HIGH_RISK' | 'FILES' | 'AUTH'>('ALL');
  const [dashboardActivitySearch, setDashboardActivitySearch] = useState('');
  const [selectedAuditLog, setSelectedAuditLog] = useState<any>(null);
  const [isDashboardDeptModalOpen, setIsDashboardDeptModalOpen] = useState(false);
  const [dashboardDeptModalView, setDashboardDeptModalView] = useState<'list' | 'detail'>('list');
  const [dashboardDeptDetail, setDashboardDeptDetail] = useState<any>(null);
  const [isDashboardDeptDetailLoading, setIsDashboardDeptDetailLoading] = useState(false);

  const fetchReportData = async (deptId?: string) => {
    const target = deptId ?? reportDeptId;
    if (target === 'active' && !currentUser?.activeDeptId) return;
    setIsReportLoading(true);
    try {
      const res = await fetch(`/api/reports/department/${encodeURIComponent(target)}`);
      if (res.ok) setReportData(await res.json());
      else setReportData(null);
    } catch (err) { console.error(err); }
    finally { setIsReportLoading(false); }
  };

  const fetchDashboardData = async (
    rangeOverride?: '24h' | '7d' | '30d',
    signal?: AbortSignal
  ) => {
    if (currentUser?.role !== 'ADMIN') return;
    setIsDashboardLoading(true);
    const targetRange = rangeOverride || dashboardRange;
    try {
      const res = await fetch(`/api/admin/dashboard?range=${targetRange}`, { signal });
      if (signal?.aborted) return;
      if (res.ok) {
        setDashboardData(await res.json());
        setDashboardLastUpdated(new Date());
      } else {
        setDashboardData(null);
      }
    } catch (err) {
      // Ignore aborted in-flight requests (tab switch, strict-mode remount, HMR).
      if (signal?.aborted) return;
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (err instanceof TypeError && String(err.message).includes('fetch')) {
        setDashboardData(null);
        return;
      }
      console.error('Dashboard fetch failed:', err);
      setDashboardData(null);
    } finally {
      if (!signal?.aborted) setIsDashboardLoading(false);
    }
  };

  const openDashboardDeptDetail = async (deptId: string) => {
    setIsDashboardDeptModalOpen(true);
    setDashboardDeptModalView('detail');
    setIsDashboardDeptDetailLoading(true);
    setDashboardDeptDetail(null);
    try {
      const res = await fetch(`/api/admin/oversight/${encodeURIComponent(deptId)}`);
      if (res.ok) setDashboardDeptDetail(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsDashboardDeptDetailLoading(false);
    }
  };

  const parseAuditMetadata = (meta: string | null) => {
    if (!meta) return null;
    try {
      return JSON.parse(meta);
    } catch {
      return meta;
    }
  };

  const deptNameById = (deptId: string | null) => {
    if (!deptId || !dashboardData?.departmentSnapshot) return 'global';
    const hit = dashboardData.departmentSnapshot.find((d: any) => d.id === deptId);
    return hit?.name || deptId;
  };

  // Vault dept filter (ADMIN can scope per department or "all")
  const [vaultDeptScope, setVaultDeptScope] = useState<string>('active');

  // The Security Vault is the single piece of UI that distinguishes ADMIN
  // from SUB_ADMIN. We check the un-aliased role (`rawRole`) so a sub-admin
  // whose effective `role` is aliased to "ADMIN" still cannot reach it.
  const canViewSecurityVault =
    currentUser?.rawRole === 'ADMIN' ||
    currentUser?.rawRole === 'HOD' ||
    (currentUser?.departments || []).some((d: any) => d.role === 'HOD');

  const auditDepartmentOptions =
    currentUser?.role === 'ADMIN'
      ? availableDepts
      : availableDepts.filter((d: any) =>
          (currentUser?.departments || []).some(
            (ud: any) => ud.departmentId === d.id && ud.role === 'HOD'
          )
        );

  const buildAuditQueryParams = (deptScope?: string) => {
    const scope = deptScope ?? vaultDeptScope;
    const params = new URLSearchParams();
    if (scope === 'all') params.set('departmentId', 'all');
    else if (scope && scope !== 'active') params.set('departmentId', scope);
    if (auditDateFrom) params.set('from', auditDateFrom);
    if (auditDateTo) params.set('to', auditDateTo);
    return params;
  };

  const fetchAuditLogs = async (deptScope?: string) => {
    try {
      const params = buildAuditQueryParams(deptScope);
      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`/api/audit${qs}`);
      if (res.ok) setAuditLogs(await res.json());
      else setAuditLogs([]);
    } catch (err) { console.error(err); }
  };

  const exportAuditLogsToExcel = async () => {
    if (!auditDateFrom || !auditDateTo) {
      alert('Please select both a start date and end date.');
      return;
    }
    setIsAuditExporting(true);
    try {
      const params = buildAuditQueryParams();
      const res = await fetch(`/api/audit/export?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Failed to export audit logs.');
        return;
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] || `security-audit_${auditDateFrom}_to_${auditDateTo}.csv`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to export audit logs.');
    } finally {
      setIsAuditExporting(false);
    }
  };

  // Oversight state (ADMIN only)
  const [oversightData, setOversightData] = useState<any>(null);
  const [isOversightLoading, setIsOversightLoading] = useState(false);
  const [oversightSelectedDept, setOversightSelectedDept] = useState<string | null>(null);
  const [oversightDetail, setOversightDetail] = useState<any>(null);
  const [isOversightDetailLoading, setIsOversightDetailLoading] = useState(false);

  const fetchOversight = async () => {
    if (currentUser?.role !== 'ADMIN') return;
    setIsOversightLoading(true);
    try {
      const res = await fetch('/api/admin/oversight');
      if (res.ok) setOversightData(await res.json());
    } catch (err) { console.error(err); }
    finally { setIsOversightLoading(false); }
  };

  const openOversightDetail = async (deptId: string) => {
    setOversightSelectedDept(deptId);
    setIsOversightDetailLoading(true);
    setOversightDetail(null);
    try {
      const res = await fetch(`/api/admin/oversight/${encodeURIComponent(deptId)}`);
      if (res.ok) setOversightDetail(await res.json());
    } catch (err) { console.error(err); }
    finally { setIsOversightDetailLoading(false); }
  };

  useEffect(() => {
    setIsMounted(true);
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setIsBootstrapping(true);
    try {
      const currRes = await fetch('/api/auth/switch');
      if (!currRes.ok) {
        window.location.href = '/login';
        return;
      }
      const { user } = await currRes.json();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      setCurrentUser(user);
      const isAdminLike = user.role === 'ADMIN';

      // Load the initial view in parallel — no blocking seed call on every refresh.
      await Promise.all([
        fetchFolders(isAdminLike),
        fetchDocuments(null, isAdminLike),
        fetchSettings(),
        fetchLabels(),
        isAdminLike ? fetchAvailableDepts() : Promise.resolve()
      ]);
    } catch (e) {
      console.error(e);
      window.location.href = '/login';
    } finally {
      setIsBootstrapping(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  const switchDepartment = async (departmentId: string) => {
    setIsSwitchingDept(true);
    try {
      const res = await fetch('/api/auth/dept-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departmentId })
      });
      if (res.ok) {
        // Choosing a specific department scopes the view to just that department.
        setAdminViewAll(false);
        // Refresh everything
        const currRes = await fetch('/api/auth/switch');
        if (currRes.ok) {
          const { user } = await currRes.json();
          setCurrentUser(user);
          setCurrentFolderId(null);
          await Promise.all([
            fetchFolders(false),
            fetchDocuments(null, false)
          ]);
        }
      }
    } catch (e) { console.error(e); }
    finally { setIsSwitchingDept(false); }
  };

  // ADMIN-only: drop the per-department scope and show every department's content.
  const viewAllDepartments = async () => {
    setIsSwitchingDept(true);
    try {
      setAdminViewAll(true);
      setCurrentFolderId(null);
      await Promise.all([
        fetchFolders(true),
        fetchDocuments(null, true)
      ]);
    } catch (e) { console.error(e); }
    finally { setIsSwitchingDept(false); }
  };

  useEffect(() => {
    // Don't fire tab data requests until the session bootstrap finishes —
    // otherwise parallel fetches race a restarting dev server and surface
    // noisy "Failed to fetch" errors in the console.
    if (isBootstrapping || !currentUser) return;

    const ac = new AbortController();

    if (activeTab === 'DASHBOARD' && currentUser.role !== 'ADMIN') {
      setActiveTab('DOCS');
      return;
    }
    if (activeTab === 'VAULT' && !canViewSecurityVault) {
      setActiveTab('DOCS');
      return;
    }
    if (activeTab === 'OVERSIGHT' && currentUser.role !== 'ADMIN') {
      setActiveTab('DOCS');
      return;
    }
    if (activeTab === 'DASHBOARD') {
      fetchDashboardData(dashboardRange, ac.signal);
    }
    if (activeTab === 'VAULT') {
      fetchAuditLogs();
      if (canViewSecurityVault && availableDepts.length === 0) fetchAvailableDepts();
    }
    if (activeTab === 'REPORTS') fetchReportData();
    if (activeTab === 'OVERSIGHT') {
      fetchOversight();
      fetchAvailableDepts();
    }
    if ((activeTab === 'DEPT' || activeTab === 'USERS') && (currentUser.role === 'ADMIN' || currentUser.role === 'HOD')) {
      fetchAvailableDepts();
    }
    if (activeTab === 'USERS' && (currentUser.role === 'ADMIN' || currentUser.role === 'HOD')) {
      refreshUsers();
    }

    return () => ac.abort();
  }, [activeTab, currentUser, isBootstrapping, dashboardRange, auditDateFrom, auditDateTo]);

  useEffect(() => {
    if (!debouncedSearchQuery || debouncedSearchQuery.trim().length < 2) {
      setGlobalResults([]);
      return;
    }
    // Note: /api/search records its own audit row, so we don't double-log.
    let cancelled = false;
    setGlobalSearchLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setGlobalResults(Array.isArray(data?.results) ? data.results : []);
        } else {
          setGlobalResults([]);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Global search failed', err);
          setGlobalResults([]);
        }
      } finally {
        if (!cancelled) setGlobalSearchLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (activeFilters.length > 0) {
      recordClientAudit('TAG_FILTER', { tags: activeFilters });
    }
  }, [activeFilters]);

  useEffect(() => {
    if (currentUser) {
      fetchDocuments(currentFolderId);
    }
  }, [currentFolderId]);

  // Fetch deleted folders whenever the Trash tab becomes active.
  useEffect(() => {
    if (!currentUser) return;
    if (viewMode === 'TRASH') {
      fetchTrashedFolders();
    } else {
      setTrashedFolders([]);
    }
  }, [viewMode, currentUser]);

  // Fetch document bytes and create a Blob URL to prevent download managers from intercepting
  useEffect(() => {
    if (!selectedDocId) {
      setPreviewUrl(null);
      return;
    }

    let isMounted = true;
    const fetchPreview = async () => {
      setIsPreviewLoading(true);
      try {
        const response = await fetch(`/api/documents/${selectedDocId}/view`);
        if (!response.ok) throw new Error('Failed to load preview');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        if (isMounted) {
          setPreviewUrl(url);
          setIsPreviewLoading(false);
        } else {
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        console.error('Preview error:', err);
        if (isMounted) setIsPreviewLoading(false);
      }
    };

    fetchPreview();

    return () => {
      isMounted = false;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedDocId]);

  const fetchDocuments = async (folderId: string | null = currentFolderId, allScope?: boolean) => {
    try {
      let endpoint: string;
      if (viewMode === 'SHARED') {
        endpoint = '/api/documents/shared';
      } else if (viewMode === 'TRASH') {
        endpoint = '/api/documents?trash=1';
      } else {
        endpoint = '/api/documents';
        const useAll = allScope ?? (adminViewAll && currentUser?.role === 'ADMIN');
        const params: string[] = [];
        if (folderId) params.push(`folderId=${folderId}`);
        if (useAll) params.push('all=1');
        if (params.length) endpoint += `?${params.join('&')}`;
      }
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const fetchTrashedFolders = async () => {
    try {
      const res = await fetch('/api/folders?trash=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTrashedFolders(data);
          if (data[0]?.retentionDays) setTrashRetentionDays(data[0].retentionDays);
        }
      }
    } catch (err) {
      console.error('Failed to fetch trashed folders', err);
    }
  };

  const restoreFolder = async (folderId: string) => {
    try {
      const res = await fetch(`/api/folders/${folderId}/restore`, { method: 'POST' });
      if (res.ok) {
        await Promise.all([fetchTrashedFolders(), fetchFolders(), fetchDocuments()]);
        notify('success', 'Folder restored.');
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to restore folder.');
      }
    } catch (err) {
      console.error('Folder restore failed', err);
      notify('error', 'Network error while restoring folder.');
    }
  };

  const permanentlyDeleteFolder = async (folderId: string, folderName: string) => {
    const ok = await confirmDialog({
      title: 'Permanently delete folder',
      message: `Permanently delete "${folderName}" and all its contents? This cannot be undone.`,
      confirmLabel: 'Delete forever',
      cancelLabel: 'Cancel',
      tone: 'danger'
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/folders/${folderId}?permanent=1`, { method: 'DELETE' });
      if (res.ok) {
        await fetchTrashedFolders();
        notify('success', 'Folder permanently deleted.');
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to delete folder.');
      }
    } catch (err) {
      console.error('Folder permanent delete failed', err);
      notify('error', 'Network error while deleting folder.');
    }
  };

  const restoreDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}/restore`, { method: 'POST' });
      if (res.ok) {
        await fetchDocuments();
        notify('success', 'Document restored.');
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to restore.');
      }
    } catch (err) {
      console.error('Restore failed', err);
      notify('error', 'Network error while restoring.');
    }
  };

  const permanentlyDeleteDocument = async (id: string) => {
    const ok = await confirmDialog({
      title: 'Permanently delete document',
      message: 'Permanently delete this document? This cannot be undone.',
      confirmLabel: 'Delete permanently',
      cancelLabel: 'Cancel',
      tone: 'danger'
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/documents/${id}?permanent=1`, { method: 'DELETE' });
      if (res.ok) {
        await fetchDocuments();
        notify('success', 'Document permanently deleted.');
      } else {
        const data = await res.json().catch(() => ({}));
        notify('error', data?.error || 'Failed to delete.');
      }
    } catch (err) {
      console.error('Permanent delete failed', err);
      notify('error', 'Network error while deleting.');
    }
  };

  const createFolder = async (name: string, parentId: string | null = null): Promise<boolean> => {
    try {
      const res = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, parentId })
      });
      if (res.ok) {
        await fetchFolders();
        notify('success', `Folder "${name}" created.`);
        return true;
      }
      const data = await res.json().catch(() => ({}));
      const msg = data?.error || 'Failed to create folder.';
      setFolderError(msg);
      return false;
    } catch (err) {
      console.error('Failed to create folder', err);
      setFolderError('Network error while creating folder.');
      return false;
    }
  };

  const fetchLabels = async () => {
    try {
      const res = await fetch('/api/labels');
      if (res.ok) {
        const data = await res.json();
        setLabels(data);
      }
    } catch (err) {
      console.error('Failed to fetch labels', err);
    }
  };

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDate, setUploadDate] = useState<string>('');
  const [uploadDeptId, setUploadDeptId] = useState<string>('');
  const [uploadFolderId, setUploadFolderId] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [uploadTextPreview, setUploadTextPreview] = useState<string | null>(null);
  const [uploadTextTruncated, setUploadTextTruncated] = useState<boolean>(false);

  // Build a live preview whenever the chosen upload file changes.
  // Images / PDFs get a blob URL; text-ish files get the first ~4 KB inlined.
  useEffect(() => {
    if (!uploadFile) {
      setUploadPreviewUrl(null);
      setUploadTextPreview(null);
      setUploadTextTruncated(false);
      return;
    }

    const mime = uploadFile.type || '';
    const ext = uploadFile.name.toLowerCase().split('.').pop() || '';
    const isImage = mime.startsWith('image/');
    const isPdf = mime === 'application/pdf' || ext === 'pdf';
    const isTextish =
      mime.startsWith('text/') ||
      mime === 'application/json' ||
      mime === 'application/xml' ||
      ['txt', 'md', 'csv', 'json', 'xml', 'log', 'js', 'ts', 'tsx', 'jsx', 'html', 'css', 'sql', 'yml', 'yaml'].includes(ext);

    let revoke: string | null = null;
    if (isImage || isPdf) {
      const url = URL.createObjectURL(uploadFile);
      revoke = url;
      setUploadPreviewUrl(url);
      setUploadTextPreview(null);
      setUploadTextTruncated(false);
    } else if (isTextish) {
      setUploadPreviewUrl(null);
      const MAX_BYTES = 4 * 1024;
      const slice = uploadFile.slice(0, MAX_BYTES + 1);
      slice.text().then(text => {
        const truncated = uploadFile.size > MAX_BYTES;
        setUploadTextPreview(truncated ? text.slice(0, MAX_BYTES) : text);
        setUploadTextTruncated(truncated);
      }).catch(() => {
        setUploadTextPreview(null);
        setUploadTextTruncated(false);
      });
    } else {
      setUploadPreviewUrl(null);
      setUploadTextPreview(null);
      setUploadTextTruncated(false);
    }

    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [uploadFile]);

  // New-folder modal state
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderError, setFolderError] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const openFolderModal = () => {
    setNewFolderName('');
    setFolderError(null);
    setIsFolderModalOpen(true);
  };

  const submitFolder = async () => {
    const name = newFolderName.trim();
    if (!name) {
      setFolderError('Please enter a folder name.');
      return;
    }
    setIsCreatingFolder(true);
    setFolderError(null);
    // New folders nest under whichever folder the user is currently viewing.
    const ok = await createFolder(name, currentFolderId);
    setIsCreatingFolder(false);
    if (ok) setIsFolderModalOpen(false);
  };

  // Helper: strip extension for a default title
  const stripExt = (name: string) => name.replace(/\.[^.]+$/, '');

  const openUploadModal = () => {
    // Pre-load available departments (only those the user can upload to) so the
    // dropdown is populated before the modal appears.
    if ((currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD') && availableDepts.length === 0) {
      fetchAvailableDepts();
    }
    setUploadFile(null);
    setUploadTitle('');
    setUploadDate(new Date().toISOString().split('T')[0]);
    const initialDept = currentUser?.activeDeptId || '';
    setUploadDeptId(initialDept);
    // Pre-select the folder the user is currently inside, if it belongs to the target dept.
    const currentFolder = folders.find((f: any) => f.id === currentFolderId);
    setUploadFolderId(currentFolder && currentFolder.departmentId === initialDept ? currentFolderId! : '');
    setUploadError(null);
    setIsUploadModalOpen(true);
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    if (!uploadTitle) setUploadTitle(stripExt(file.name));
    // Ensure modal is open in case the picker was triggered before the modal
    setIsUploadModalOpen(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submitUpload = async () => {
    if (!uploadFile) {
      setUploadError('Pick a file to upload.');
      return;
    }
    if (!uploadDeptId) {
      setUploadError('Pick a department to allocate this document to.');
      return;
    }
    const title = uploadTitle.trim();
    if (!title) {
      setUploadError('Title cannot be empty.');
      return;
    }
    setUploadError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('displayName', title);
    if (uploadDeptId) formData.append('departmentId', uploadDeptId);
    if (uploadDate) {
      // Treat the picked calendar day as midday in local time so timezone slop doesn't push it to the wrong day.
      const [y, m, d] = uploadDate.split('-').map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0, 0);
      if (!isNaN(dt.getTime())) formData.append('createdAt', dt.toISOString());
    }
    if (uploadFolderId) {
      // Folder list is already filtered to the chosen department; the API re-validates too.
      formData.append('folderId', uploadFolderId);
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        await fetchDocuments();
        notify('success', 'File uploaded.');
        setIsUploadModalOpen(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setUploadError(data?.error || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setUploadError('Upload failed: network error.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirmDialog({
      title: 'Move to Trash',
      message: 'Move this document to Trash? You can restore it from the Trash later.',
      confirmLabel: 'Move to Trash',
      cancelLabel: 'Cancel',
      tone: 'warning'
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        if (selectedDocId === id) setSelectedDocId(null);
        await fetchDocuments();
        notify('success', 'Document moved to Trash.');
      } else {
        const errorData = await res.json();
        notify('error', `Delete failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      notify('error', 'Delete failed: network error');
    }
  };

  const handleRename = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name,
          displayName: name 
        })
      });
      if (res.ok) {
        await fetchDocuments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLabel = async () => {
    if (!newLabelName.trim()) return;

    try {
      const res = await fetch('/api/labels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newLabelName })
      });
      if (res.ok) {
        setNewLabelName('');
        await fetchLabels();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignLabel = async (docId: string, labelId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    const currentLabelIds = doc.labels.map(l => l.id);
    const newLabelIds = currentLabelIds.includes(labelId)
      ? currentLabelIds.filter(id => id !== labelId)
      : [...currentLabelIds, labelId];

    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labelIds: newLabelIds })
      });
      if (res.ok) {
        await fetchDocuments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCollaborators = async (id: string) => {
    setIsShareLoading(true);
    try {
      const res = await fetch(`/api/documents/${id}/share`);
      if (res.ok) setCollaborators(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsShareLoading(false);
    }
  };

  const handleShare = async () => {
    if (!sharingDocId || !shareUserId.trim()) return;

    let expiresAtIso: string | null = null;
    if (shareExpiryDate) {
      // End-of-day in the user's local timezone for the chosen date
      const [y, m, d] = shareExpiryDate.split('-').map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
      if (!isNaN(dt.getTime()) && dt.getTime() > Date.now()) {
        expiresAtIso = dt.toISOString();
      }
    }

    try {
      const res = await fetch(`/api/documents/${sharingDocId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sharedWithUserId: shareUserId,
          permissionLevel,
          expiresAt: expiresAtIso,
          ttlHours: !expiresAtIso && ttlHours > 0 ? ttlHours : null
        })
      });
      if (res.ok) {
        setShareUserId('');
        setShareExpiryDate('');
        setTtlHours(0);
        await fetchCollaborators(sharingDocId);
        notify('success', 'Access granted.');
      } else {
        const data = await res.json();
        notify('error', `Sharing failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      notify('error', 'Sharing failed: network error');
    }
  };

  const handleRemoveCollaborator = async (userId: string) => {
    if (!sharingDocId) return;
    try {
      const res = await fetch(`/api/documents/${sharingDocId}/share?userId=${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchCollaborators(sharingDocId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/?selectedDocId=${id}`;
    navigator.clipboard.writeText(url);
    notify('info', 'Internal dashboard link copied to clipboard.');
  };

  const getTimeRemaining = (expiresAt: string | null) => {
    if (!expiresAt) return null;
    const diff = new Date(expiresAt).getTime() - new Date().getTime();
    if (diff <= 0) return { text: 'Expired', isUrgent: true };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const isUrgent = diff < 1000 * 60 * 60; // Less than 1 hour
    return {
      text: hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`,
      isUrgent
    };
  };

  const fetchLogs = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}/activity`);
      if (res.ok) {
        const data = await res.json();
        setActiveLogs(data);
        setShowLogsFor(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const query = debouncedSearchQuery.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(query) ||
      (doc.displayName && doc.displayName.toLowerCase().includes(query));
    const matchesLabels = activeFilters.length === 0 || 
      activeFilters.every(filter => doc.labels.some(l => l.name === filter));
    return matchesSearch && matchesLabels;
  });

  const normalizedUserSearch = userSearchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((u: any) => {
    if (!normalizedUserSearch) return true;
    const deptNames = Array.isArray(u.departments)
      ? u.departments.map((d: any) => d.department?.name || '').join(' ')
      : '';
    const haystack = `${u.name || ''} ${u.email || ''} ${u.role || ''} ${u.id || ''} ${deptNames}`.toLowerCase();
    return haystack.includes(normalizedUserSearch);
  });

  const filteredDashboardActivity = (dashboardData?.recentActivity || []).filter((log: any) => {
    const action = String(log.action || '').toUpperCase();
    const isHighRisk = action.includes('HIGH_RISK') || action.includes('FAILED') || action.includes('UNAUTHORIZED');
    const isFileAction = action.includes('FILE_') || action.includes('DOCUMENT') || action.includes('FOLDER');
    const isAuthAction = action.includes('LOGIN') || action.includes('PASSWORD') || action.includes('SESSION');
    const categoryOk =
      dashboardActivityFilter === 'ALL'
        ? true
        : dashboardActivityFilter === 'HIGH_RISK'
          ? isHighRisk
          : dashboardActivityFilter === 'FILES'
            ? isFileAction
            : isAuthAction;
    if (!categoryOk) return false;
    const q = dashboardActivitySearch.trim().toLowerCase();
    if (!q) return true;
    const text = `${log.action || ''} ${log.userName || ''} ${log.userEmail || ''} ${log.departmentId || ''}`.toLowerCase();
    return text.includes(q);
  });

  if (!isMounted || isBootstrapping) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#ffffff',
        color: '#64748b',
        fontFamily: "'Inter', system-ui, sans-serif",
        gap: '12px'
      }}>
        <div style={{
          width: 28,
          height: 28,
          border: '3px solid rgba(0, 166, 81, 0.2)',
          borderTopColor: '#00A651',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }} />
        <span style={{ fontSize: '0.9rem' }}>Loading…</span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style dangerouslySetInnerHTML={{ __html: `
        .label-pill-interactive:hover {
          transform: scale(1.05);
          cursor: pointer;
          background: rgba(0, 166, 81, 0.2) !important;
        }
        .folderCard:hover {
          transform: translateY(-2px);
          background: rgba(0, 166, 81, 0.05) !important;
          border-color: rgba(0, 166, 81, 0.3) !important;
        }
        .clear-filter-btn:hover {
          background: rgba(220, 38, 38, 0.2) !important;
          transform: translateY(-1px);
        }
        .dashboard-kpi-clickable {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .dashboard-kpi-clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.12) !important;
        }
        .dashboard-drill-row {
          transition: background 0.15s ease, border-color 0.15s ease;
          cursor: pointer;
          border-radius: 8px;
          padding: 4px 6px;
        }
        .dashboard-drill-row:hover {
          background: rgba(37, 99, 235, 0.06);
        }
        .dashboard-timeline-item {
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
          cursor: pointer;
        }
        .dashboard-timeline-item:hover {
          border-color: rgba(37, 99, 235, 0.28) !important;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.1);
          transform: translateX(2px);
        }
        .edocs-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }
        .edocs-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .edocs-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #cbd5e1;
          border: 1px solid #94a3b8;
          transition: background-color .25s, border-color .25s;
          border-radius: 999px;
        }
        .edocs-slider:hover {
          background-color: #94a3b8;
        }
        .edocs-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          top: 2px;
          background-color: #ffffff;
          transition: transform .25s ease;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.05);
        }
        .edocs-switch input:checked + .edocs-slider {
          background-color: #00A651;
          border-color: #006837;
        }
        .edocs-switch input:checked + .edocs-slider:hover {
          background-color: #008C44;
        }
        .edocs-switch input:checked + .edocs-slider:before {
          transform: translateX(22px);
        }
        .edocs-switch input:focus-visible + .edocs-slider {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
        }
        .edocs-setting-row {
          cursor: pointer;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          transition: background-color .15s, border-color .15s;
        }
        .edocs-setting-row:hover {
          background-color: #f8fafc;
          border-color: #e2e8f0;
        }
      `}} />
      <aside style={styles.sideNav}>
        <div style={styles.sideNavBrand}>
          <div style={styles.brandRow}>
            {/* MUJHU brand mark: green leaf swoosh + coral drop */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M4 22 C 4 11, 13 4, 24 4 C 24 15, 17 22, 4 22 Z" fill="#00A651" />
              <circle cx="23" cy="23" r="4.5" fill="#2563EB" />
            </svg>
            <h1 style={styles.title}><span style={styles.titleAccent}>Multichoice</span></h1>
          </div>
          {currentUser && (
            <div style={styles.sideNavUser}>
              <div style={styles.sideNavUserName}>{currentUser.name}</div>
              <div style={styles.sideNavUserRole}>{currentUser.role}</div>
            </div>
          )}
        </div>

        <nav style={styles.sideNavLinks}>
          {currentUser?.role === 'ADMIN' && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'DASHBOARD' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('DASHBOARD')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-18v7h6V2h-6z" />
                </svg>
              </span>
              Dashboard
            </button>
          )}
          <button
            style={{ ...styles.sideNavItem, ...(activeTab === 'DOCS' ? styles.activeSideNavItem : {}) }}
            onClick={() => setActiveTab('DOCS')}
          >
            <span style={styles.sideNavIcon} aria-hidden>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
              </svg>
            </span>
            Documents
          </button>
          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD') && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'DEPT' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('DEPT')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
                </svg>
              </span>
              Departments
            </button>
          )}
          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD') && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'USERS' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('USERS')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Users
            </button>
          )}
          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD') && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'REPORTS' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('REPORTS')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6m4 6V5m4 14v-9M5 21h14" />
                </svg>
              </span>
              Reports
            </button>
          )}
          {currentUser?.role === 'ADMIN' && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'OVERSIGHT' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('OVERSIGHT')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              Oversight
            </button>
          )}
          {canViewSecurityVault && (
            <button
              style={{ ...styles.sideNavItem, ...(activeTab === 'VAULT' ? styles.activeSideNavItem : {}) }}
              onClick={() => setActiveTab('VAULT')}
            >
              <span style={styles.sideNavIcon} aria-hidden>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.66 0 1.26-.21 1.76-.55M12 11a3 3 0 100-6 3 3 0 000 6zm0 0v10m-7-7a7 7 0 1014 0v-2a7 7 0 10-14 0v2z" />
                </svg>
              </span>
              Security Vault
            </button>
          )}
        </nav>

        <div style={styles.sideNavFooter}>
          <button
            style={{
              background: 'transparent',
              color: '#64748b',
              border: '1px solid rgba(15,23,42,0.08)',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '0.75rem',
              width: '100%',
              marginBottom: '8px',
              cursor: 'pointer'
            }}
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Change password
          </button>
          <button style={{ ...styles.logoutButton, width: '100%' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <div style={styles.contentColumn}>
        <header style={styles.topBar}>
          <div style={styles.topBarTitle}>
            {activeTab === 'DASHBOARD' ? 'System Dashboard' :
             activeTab === 'DOCS' ? 'Documents' :
             activeTab === 'REPORTS' ? 'Reports' :
             activeTab === 'USERS' ? 'User Management' :
             activeTab === 'DEPT' ? 'Departments' :
             activeTab === 'OVERSIGHT' ? 'Oversight' :
             activeTab === 'VAULT' ? 'Security Vault' : ''}
          </div>
          <div style={styles.headerRight}>
            {(() => {
              const isAdminLike = currentUser?.role === 'ADMIN';
              const hasMemberships = (currentUser?.departments?.length ?? 0) > 0;
              // Admin-like users (ADMIN, SUB_ADMIN) get the switcher even with
              // no department memberships — they can scope to any dept in the
              // tenant. Other roles only see it if they belong to one.
              if (!currentUser || (!isAdminLike && !hasMemberships)) return null;

              // Build the options list. For admins we use the full tenant
              // dept list (availableDepts); for everyone else we use their
              // own memberships so they only see what they can actually pick.
              const membershipMap = new Map(
                (currentUser.departments || []).map((ud: any) => [ud.departmentId, ud])
              );
              const adminOptions = (availableDepts || []).map((d: any) => ({
                id: d.id,
                name: d.name,
                roleLabel: (membershipMap.get(d.id) as any)?.role || null
              }));
              const userOptions = (currentUser.departments || []).map((ud: any) => ({
                id: ud.departmentId,
                name: ud.department?.name || 'Unknown',
                roleLabel: ud.role as string | null
              }));
              const deptOptions = isAdminLike ? adminOptions : userOptions;

              const onAllView = isAdminLike && adminViewAll;
              const activeBorder = onAllView
                ? '#94a3b8'
                : getLabelColor(currentUser.activeDept?.name || '').base;

              return (
                <div style={styles.mockAuthWrapper}>
                  <span style={styles.sidebarTitle}>Dept:</span>
                  <select
                    style={{
                      ...styles.mockUserSelect,
                      borderBottom: `2px solid ${activeBorder}`
                    }}
                    value={onAllView ? '__ALL__' : (currentUser.activeDeptId || '')}
                    onChange={(e) => {
                      if (e.target.value === '__ALL__') viewAllDepartments();
                      else switchDepartment(e.target.value);
                    }}
                    disabled={isSwitchingDept}
                  >
                    {isAdminLike && (
                      <option value="__ALL__">All Departments</option>
                    )}
                    {deptOptions.length === 0 && !isAdminLike && (
                      <option value="" disabled>No departments assigned</option>
                    )}
                    {deptOptions.map((opt: { id: string; name: string; roleLabel: string | null }) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}{opt.roleLabel ? ` (${opt.roleLabel})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })()}
            {(() => {
              const canUpload = !!currentUser && (
                currentUser.role === 'ADMIN' ||
                (Array.isArray(currentUser.effectivePermissions) && currentUser.effectivePermissions.includes('UPLOAD'))
              );
              return (
                <button
                  style={{ ...styles.uploadButton, opacity: (isUploading || !canUpload) ? 0.4 : 1, cursor: canUpload ? 'pointer' : 'not-allowed' }}
                  onClick={() => { if (canUpload) openUploadModal(); }}
                  disabled={isUploading || !canUpload}
                  title={canUpload ? 'Upload a file' : 'You do not have UPLOAD permission in this department'}
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
              );
            })()}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFilePicked}
              style={{ display: 'none' }}
            />
          </div>
        </header>

        <div style={styles.main}>
        <div style={{
          ...styles.sidebar,
          width: activeTab === 'DOCS' ? '600px' : '100%',
          borderRight: activeTab === 'DOCS' ? '1px solid #e5e7eb' : 'none',
          flex: activeTab === 'DOCS' ? 'initial' : 1
        }}>
          {activeTab === 'DOCS' ? (
            <>
          <div style={styles.sidebarTabs}>
            <button 
              style={{
                ...styles.tabBtn,
                ...(viewMode === 'MINE' ? styles.activeTab : {})
              }}
              onClick={() => setViewMode('MINE')}
            >
              My Documents
            </button>
            <button 
              style={{
                ...styles.tabBtn,
                ...(viewMode === 'SHARED' ? styles.activeTab : {})
              }}
              onClick={() => setViewMode('SHARED')}
            >
              Shared With Me
            </button>
            <button
              style={{
                ...styles.tabBtn,
                ...(viewMode === 'TRASH' ? styles.activeTab : {})
              }}
              onClick={() => setViewMode('TRASH')}
              title="Recently deleted documents"
            >
              Trash
            </button>
          </div>

          <div style={{ ...styles.localSearchWrapper, position: 'relative' }}>
            <div style={styles.localSearchContainer}>
              <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                style={styles.localSearchInput}
                placeholder="Search documents (name, labels, content)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setGlobalSearchOpen(true)}
                onBlur={() => setTimeout(() => setGlobalSearchOpen(false), 180)}
              />
              {currentUser?.role === 'ADMIN' && (
                <button
                  onClick={rebuildSearchIndex}
                  disabled={indexRebuilding}
                  title="Rebuild the document search index"
                  style={{
                    background: 'transparent',
                    color: '#64748b',
                    border: '1px solid rgba(15,23,42,0.08)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.65rem',
                    cursor: indexRebuilding ? 'wait' : 'pointer',
                    marginLeft: '6px'
                  }}
                >
                  {indexRebuilding ? 'Indexing…' : 'Rebuild index'}
                </button>
              )}
            </div>

            {globalSearchOpen && debouncedSearchQuery.trim().length >= 2 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.10)',
                  maxHeight: '420px',
                  overflowY: 'auto',
                  zIndex: 200,
                  padding: '6px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 8px',
                  fontSize: '0.65rem',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  <span>Find anywhere</span>
                  <span>{globalSearchLoading ? 'Searching…' : `${globalResults.length} hit${globalResults.length === 1 ? '' : 's'}`}</span>
                </div>

                {globalResults.length === 0 && !globalSearchLoading && (
                  <div style={{ padding: '14px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                    No matches across the documents you can see.
                  </div>
                )}

                {globalResults.map((r: any) => (
                  <button
                    key={r.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={async () => {
                      setGlobalSearchOpen(false);
                      // If the result is in a different department and we're ADMIN, switch in.
                      if (
                        currentUser?.role === 'ADMIN'
                        && r.department?.id
                        && r.department.id !== currentUser?.activeDeptId
                      ) {
                        try { await switchDepartment(r.department.id); }
                        catch { /* ignore */ }
                      }
                      if (r.deletedAt) {
                        setViewMode('TRASH');
                        setCurrentFolderId(null);
                      } else if (r.folder?.id) {
                        setViewMode('MINE');
                        setCurrentFolderId(r.folder.id);
                      } else if (r.sharedWithMe) {
                        setViewMode('SHARED');
                        setCurrentFolderId(null);
                      } else {
                        setViewMode('MINE');
                        setCurrentFolderId(null);
                      }
                      // Give state a tick to settle, then open the preview.
                      setTimeout(() => setSelectedDocId(r.id), 50);
                      recordClientAudit('FILE_VIEW', { documentId: r.id, fileName: r.name, source: 'global_search' });
                    }}
                    style={{
                      display: 'flex',
                      width: '100%',
                      gap: '10px',
                      padding: '8px 10px',
                      background: 'transparent',
                      border: 0,
                      color: '#1e293b',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      alignItems: 'center'
                    }}
                    className="folderCard"
                  >
                    <span style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(37, 99, 235, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" fill="none" stroke="#2563EB" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" /></svg>
                    </span>
                    <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.displayName || r.name}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {r.department?.name && <span>{r.department.name}</span>}
                        {r.folder?.name && <span>· {r.folder.name}</span>}
                        {r.labels?.length > 0 && <span>· {r.labels.map((l: any) => l.name).join(', ')}</span>}
                        {r.sharedWithMe && <span style={{ color: '#10b981' }}>· shared with me</span>}
                        {r.deletedAt && <span style={{ color: '#DC2626' }}>· in trash</span>}
                      </span>
                    </span>
                    <span style={{ fontSize: '0.6rem', color: '#2563EB', fontWeight: 700 }}>open</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {activeFilters.length > 0 && (
            <div style={styles.filterTray}>
              <div style={styles.filterTrayLabel}>Filters:</div>
              <div style={styles.activeChips}>
                <AnimatePresence>
                  {activeFilters.map(filter => {
                    const colors = getLabelColor(filter);
                    return (
                      <motion.div 
                        key={filter}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                          ...styles.filterChip,
                          background: colors.bg,
                          borderColor: colors.border,
                          color: colors.base
                        }}
                      >
                        {filter}
                        <button 
                          style={styles.removeChipBtn} 
                          onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
                        >
                          ×
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              {activeFilters.length > 1 && (
                <button 
                  style={styles.clearAllBtn}
                  onClick={() => setActiveFilters([])}
                >
                  Clear All
                </button>
              )}
            </div>
          )}
          {viewMode === 'MINE' && (() => {
            // Build the ancestor chain (root → … → current) by walking parentId links.
            const byId = new Map<string, any>(folders.map((f: any) => [f.id, f]));
            const trail: any[] = [];
            let cursor: string | null = currentFolderId;
            let guard = 0;
            while (cursor && guard < 50) {
              const node = byId.get(cursor);
              if (!node) break;
              trail.unshift(node);
              cursor = node.parentId ?? null;
              guard++;
            }
            const canCreateFolder = !!currentUser && (
              currentUser.role === 'ADMIN' ||
              currentUser.role === 'HOD' ||
              currentUser.deptRole === 'HOD'
            );
            return (
              <div style={styles.folderControls}>
                <div style={styles.breadcrumb}>
                  <button style={styles.breadcrumbBtn} onClick={() => setCurrentFolderId(null)}>Home</button>
                  {trail.map((f, idx) => {
                    const isLast = idx === trail.length - 1;
                    return (
                      <span key={f.id} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span style={styles.breadcrumbSep}>/</span>
                        {isLast ? (
                          <span style={styles.breadcrumbActive}>{f.name}</span>
                        ) : (
                          <button style={styles.breadcrumbBtn} onClick={() => setCurrentFolderId(f.id)}>{f.name}</button>
                        )}
                      </span>
                    );
                  })}
                </div>
                {canCreateFolder && (
                  <button
                    style={styles.newFolderBtn}
                    onClick={openFolderModal}
                  >
                    {currentFolderId ? '+ New Sub-folder' : '+ New Folder'}
                  </button>
                )}
              </div>
            );
          })()}

          {viewMode === 'MINE' && folders.filter((f: any) => (f.parentId ?? null) === currentFolderId).length > 0 && (
            <div style={styles.folderGrid}>
              {folders.filter((f: any) => (f.parentId ?? null) === currentFolderId).map(folder => {
                const isShared = !!folder.isShared;
                const isAdmin = currentUser?.role === 'ADMIN';
                const isOwner = folder.userId === currentUser?.id;
                const canManage = isAdmin || isOwner;
                const showDept = !!folder.department?.name
                  && folder.departmentId !== currentUser?.activeDeptId
                  && currentUser?.role === 'ADMIN'
                  && folder.department.name.toLowerCase() !== folder.name.toLowerCase();
                return (
                  <div
                    key={folder.id}
                    style={{
                      ...styles.folderCard,
                      borderColor: isShared ? 'rgba(16, 185, 129, 0.35)' : undefined,
                      background: isShared ? 'rgba(16, 185, 129, 0.06)' : undefined
                    }}
                    className="folderCard"
                    onClick={() => setCurrentFolderId(folder.id)}
                  >
                    <div style={styles.folderCardHeader}>
                      <svg width="24" height="24" fill={isShared ? '#10b981' : '#2563EB'} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <div style={styles.folderCardActions} onClick={(e) => e.stopPropagation()}>
                        {isShared && (
                          <span
                            style={styles.sharedBadge}
                            title={`Shared with you (${folder.sharedGrant?.permissionLevel || 'VIEW'})`}
                          >
                            SHARED
                          </span>
                        )}
                        {canManage && (
                          <div style={{ position: 'relative' }}>
                            <button
                              style={styles.dotBtn}
                              title="More actions"
                              onClick={() => setFolderMenuId(folderMenuId === folder.id ? null : folder.id)}
                            >
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              </svg>
                            </button>
                            {folderMenuId === folder.id && (
                              <div style={{ ...styles.quickActions, right: 0, left: 'auto', top: '30px' }}>
                                {isAdmin && (
                                  <button
                                    style={styles.quickBtn}
                                    onClick={() => { setFolderMenuId(null); openFolderShareModal(folder); }}
                                  >
                                    Share
                                  </button>
                                )}
                                <button
                                  style={styles.quickBtn}
                                  onClick={() => { setFolderMenuId(null); handleFolderRename(folder); }}
                                >
                                  Rename
                                </button>
                                <button
                                  style={{ ...styles.quickBtn, color: '#DC2626' }}
                                  onClick={() => { setFolderMenuId(null); handleFolderDelete(folder); }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <span style={styles.folderName} title={folder.name}>{folder.name}</span>
                    {showDept && (
                      <span
                        title={`From ${folder.department.name}`}
                        style={styles.folderDeptBadge}
                      >
                        {folder.department.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'TRASH' && (
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.30)',
                color: '#92400E',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '0.8rem',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
              <span>
                Items in Trash are recoverable for <strong>{trashRetentionDays} days</strong>. After that they are permanently deleted.
              </span>
            </div>
          )}

          {viewMode === 'TRASH' && trashedFolders.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Deleted folders ({trashedFolders.length})
              </div>
              <div style={styles.folderGrid}>
                {trashedFolders.map((folder: any) => {
                  const isAdmin = currentUser?.role === 'ADMIN';
                  const isOwner = folder.userId === currentUser?.id;
                  const canManage = isAdmin || isOwner;
                  const days = typeof folder.daysRemaining === 'number' ? folder.daysRemaining : 0;
                  const urgent = days <= 3;
                  return (
                    <div
                      key={folder.id}
                      style={{
                        ...styles.folderCard,
                        borderColor: urgent ? 'rgba(220, 38, 38, 0.45)' : 'rgba(148, 163, 184, 0.45)',
                        background: 'rgba(148, 163, 184, 0.08)',
                        opacity: 0.95
                      }}
                      className="folderCard"
                    >
                      <div style={styles.folderCardHeader}>
                        <svg width="24" height="24" fill="#94a3b8" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <div style={styles.folderCardActions} onClick={(e) => e.stopPropagation()}>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: urgent ? 'rgba(220, 38, 38, 0.12)' : 'rgba(245, 158, 11, 0.14)',
                              color: urgent ? '#DC2626' : '#92400E',
                              border: `1px solid ${urgent ? 'rgba(220, 38, 38, 0.30)' : 'rgba(245, 158, 11, 0.30)'}`,
                              whiteSpace: 'nowrap'
                            }}
                            title={`Permanently deleted in ${days} day${days === 1 ? '' : 's'}`}
                          >
                            {days > 0 ? `${days}d left` : 'expires today'}
                          </span>
                          {canManage && (
                            <>
                              <button
                                style={{ ...styles.dotBtn, color: '#2563EB' }}
                                title="Restore folder"
                                onClick={() => restoreFolder(folder.id)}
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                                  <path d="M3 4v5h5" />
                                </svg>
                              </button>
                              <button
                                style={{ ...styles.dotBtn, color: '#DC2626' }}
                                title="Delete permanently"
                                onClick={() => permanentlyDeleteFolder(folder.id, folder.name)}
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18" />
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <span style={styles.folderName} title={folder.name}>{folder.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                        {folder._count?.documents ?? 0} doc{(folder._count?.documents ?? 0) === 1 ? '' : 's'}
                        {folder._count?.children ? ` · ${folder._count.children} sub` : ''}
                        {folder.department?.name ? ` · ${folder.department.name}` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={styles.tableContainer}>
            {filteredDocuments.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={{ ...styles.th, width: '40%' }}>File</th>
                    <th style={{ ...styles.th, width: '18%' }}>Source</th>
                    <th style={{ ...styles.th, width: '22%' }}>Context</th>
                    <th style={{ ...styles.th, width: '20%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredDocuments.map(doc => {
                      const timer = getTimeRemaining(viewMode === 'SHARED' ? doc.permissions?.[0]?.expiresAt : null);
                      const isShared = doc.permissions && doc.permissions.length > 0;
                      
                      return (
                        <motion.tr 
                          key={doc.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            ...styles.tr, 
                            background: selectedDocId === doc.id ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                            borderLeft: selectedDocId === doc.id ? '3px solid #2563EB' : '3px solid transparent'
                          }}
                          onClick={() => setSelectedDocId(doc.id)}
                          className="doc-row"
                        >
                        <td style={styles.td}>
                          <div style={styles.fileCell}>
                            <div style={styles.fileIcon}>
                              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                            <div style={styles.nameCell}>
                              <span style={styles.docName}>
                                <HighlightText text={doc.displayName || doc.name} query={debouncedSearchQuery} />
                              </span>
                              {(doc.displayName && doc.displayName !== doc.name) && (
                                <span style={styles.originalName}>
                                  <HighlightText text={doc.name} query={debouncedSearchQuery} />
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.sourceCell}>
                            <div style={styles.sourceAvatar}>{doc.userId[0].toUpperCase()}</div>
                            <span style={styles.sourceDate}>{new Date(doc.createdAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.labelsList}>
                            {viewMode === 'TRASH' && typeof (doc as any).daysRemaining === 'number' && (() => {
                              const days = (doc as any).daysRemaining as number;
                              const urgent = days <= 3;
                              return (
                                <span
                                  title={`Permanently deleted in ${days} day${days === 1 ? '' : 's'}`}
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    background: urgent ? 'rgba(220, 38, 38, 0.12)' : 'rgba(245, 158, 11, 0.14)',
                                    color: urgent ? '#DC2626' : '#92400E',
                                    border: `1px solid ${urgent ? 'rgba(220, 38, 38, 0.30)' : 'rgba(245, 158, 11, 0.30)'}`,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {days > 0 ? `${days}d left` : 'expires today'}
                                </span>
                              );
                            })()}
                            {doc.labels.map(l => {
                              const colors = getLabelColor(l.name);
                              const isActive = activeFilters.includes(l.name);
                              return (
                                <span 
                                  key={l.id} 
                                  style={{
                                    ...styles.labelPill,
                                    background: isActive ? colors.base : colors.bg,
                                    color: isActive ? '#ffffff' : colors.base,
                                    borderColor: colors.border,
                                    fontWeight: isActive ? '700' : '500'
                                  }} 
                                  className="label-pill-interactive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!activeFilters.includes(l.name)) {
                                      setActiveFilters(prev => [...prev, l.name]);
                                    }
                                  }}
                                >
                                  {l.name}
                                </span>
                              );
                            })}
                            {doc.labels.length === 0 && <span style={styles.noLabels}>-</span>}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.securityCell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {isShared ? (
                                <span title="Shared"><svg width="14" height="14" fill="none" stroke="#2563EB" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></span>
                              ) : (
                                <span title="Private"><svg width="14" height="14" fill="none" stroke="#64748b" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></span>
                              )}
                              {timer && (
                                <span style={{ 
                                  ...styles.timerBadge, 
                                  color: timer.isUrgent ? '#DC2626' : '#f59e0b',
                                  background: timer.isUrgent ? 'rgba(220, 38, 38, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                                }}>
                                  {timer.text}
                                </span>
                              )}
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={e => e.stopPropagation()}>
                              {(() => {
                                const perms: string[] = Array.isArray(currentUser?.effectivePermissions) ? currentUser.effectivePermissions : [];
                                const isAdmin = currentUser?.role === 'ADMIN';
                                const canDelete = isAdmin || perms.includes('DELETE');
                                if (viewMode === 'TRASH') {
                                  return (
                                    <button
                                      style={{ ...styles.dotBtn, color: '#DC2626' }}
                                      title="Delete permanently"
                                      onClick={() => permanentlyDeleteDocument(doc.id)}
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                      </svg>
                                    </button>
                                  );
                                }
                                if (viewMode === 'MINE') {
                                  return (
                                    <button
                                      style={{
                                        ...styles.dotBtn,
                                        color: canDelete ? '#DC2626' : '#94a3b8',
                                        cursor: canDelete ? 'pointer' : 'not-allowed'
                                      }}
                                      title={canDelete ? 'Move to Trash' : 'You do not have DELETE permission in this department'}
                                      disabled={!canDelete}
                                      onClick={() => { if (canDelete) handleDelete(doc.id); }}
                                    >
                                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                      </svg>
                                    </button>
                                  );
                                }
                                return null;
                              })()}
                              <div style={styles.actionMenu}>
                              <button style={styles.dotBtn} title="More Actions" onClick={() => setMenuDocId(menuDocId === doc.id ? null : doc.id)}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>
                              </button>
                              
                              {menuDocId === doc.id && (() => {
                                const perms: string[] = Array.isArray(currentUser?.effectivePermissions) ? currentUser.effectivePermissions : [];
                                const isAdmin = currentUser?.role === 'ADMIN';
                                const canShare = isAdmin || perms.includes('SHARE');
                                const canEdit = isAdmin || perms.includes('EDIT');
                                const canDelete = isAdmin || perms.includes('DELETE');
                                return (
                                <div style={styles.quickActions}>
                                  {viewMode === 'TRASH' ? (
                                    <>
                                      <button
                                        style={styles.quickBtn}
                                        onClick={() => { restoreDocument(doc.id); setMenuDocId(null); }}
                                      >
                                        Restore
                                      </button>
                                      <button
                                        style={{ ...styles.quickBtn, color: '#DC2626' }}
                                        onClick={() => { permanentlyDeleteDocument(doc.id); setMenuDocId(null); }}
                                      >
                                        Delete forever
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                  {(viewMode === 'MINE' || doc.permissions?.some(p => p.permissionLevel === 'EDIT')) && (
                                    <>
                                      <button
                                        style={{ ...styles.quickBtn, opacity: canShare ? 1 : 0.4, cursor: canShare ? 'pointer' : 'not-allowed' }}
                                        disabled={!canShare}
                                        title={canShare ? 'Share document' : 'You do not have SHARE permission in this department'}
                                        onClick={() => { if (!canShare) return; setSharingDocId(doc.id); setIsShareModalOpen(true); fetchCollaborators(doc.id); setMenuDocId(null); }}
                                      >
                                        Share
                                      </button>
                                      <button
                                        style={{ ...styles.quickBtn, opacity: canEdit ? 1 : 0.4, cursor: canEdit ? 'pointer' : 'not-allowed' }}
                                        disabled={!canEdit}
                                        title={canEdit ? 'Rename document' : 'You do not have EDIT permission in this department'}
                                        onClick={() => { if (!canEdit) return; const newName = prompt('New name:', doc.displayName || doc.name); if (newName) handleRename(doc.id, newName); setMenuDocId(null); }}
                                      >
                                        Rename
                                      </button>
                                    </>
                                  )}
                                  <button style={styles.quickBtn} onClick={() => { fetchLogs(doc.id); setMenuDocId(null); }}>History</button>
                                  {viewMode === 'MINE' && (
                                    <button
                                      style={{ ...styles.quickBtn, color: '#DC2626', opacity: canDelete ? 1 : 0.4, cursor: canDelete ? 'pointer' : 'not-allowed' }}
                                      disabled={!canDelete}
                                      title={canDelete ? 'Move to Trash' : 'You do not have DELETE permission in this department'}
                                      onClick={() => { if (!canDelete) return; handleDelete(doc.id); setMenuDocId(null); }}
                                    >
                                      Move to Trash
                                    </button>
                                  )}
                                    </>
                                  )}
                                </div>
                                );
                              })()}
                            </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                </tbody>
              </table>
            ) : (
              <div style={styles.emptyState}>
                <svg width="64" height="64" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ marginBottom: '1.5rem' }}><path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                <h3 style={styles.emptyTitle}>
                  {debouncedSearchQuery ? 'No matching results' : (activeFilters.length > 0 ? 'No exact matches' : 'No assets found')}
                </h3>
                <p style={styles.emptySub}>
                  {debouncedSearchQuery 
                    ? `No matches for "${debouncedSearchQuery}" in these categories. Try clearing a tag or checking your spelling.`
                    : (activeFilters.length > 0 
                      ? 'No documents match all selected tags. Try removing a filter.' 
                      : 'Get started by uploading your first document.')}
                </p>
                {(activeFilters.length > 0 || debouncedSearchQuery) ? (
                  <button style={styles.emptyBtn} onClick={() => { setActiveFilters([]); setSearchQuery(''); }}>Clear All Filters & Search</button>
                ) : (
                  <button style={styles.emptyBtn} onClick={() => openUploadModal()}>Upload First Document</button>
                )}
              </div>
            )}
          </div>
          </>
          ) : activeTab === 'VAULT' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <div>
                  <h2 style={styles.vaultTitle}>Security Audit Logs</h2>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                    Filter by date range and department. Export opens in Microsoft Excel.
                  </div>
                </div>
                <div style={{ ...styles.vaultControls, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.65rem', color: '#64748b' }}>
                    From
                    <input
                      type="date"
                      value={auditDateFrom}
                      max={auditDateTo || undefined}
                      onChange={(e) => setAuditDateFrom(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        color: '#1e293b',
                        border: '1px solid rgba(15,23,42,0.1)',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem'
                      }}
                    />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.65rem', color: '#64748b' }}>
                    To
                    <input
                      type="date"
                      value={auditDateTo}
                      min={auditDateFrom || undefined}
                      onChange={(e) => setAuditDateTo(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        color: '#1e293b',
                        border: '1px solid rgba(15,23,42,0.1)',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem'
                      }}
                    />
                  </label>
                  <select
                    value={vaultDeptScope}
                    onChange={e => {
                      const v = e.target.value;
                      setVaultDeptScope(v);
                      fetchAuditLogs(v);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      color: '#1e293b',
                      border: '1px solid rgba(15,23,42,0.1)',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '0.75rem',
                      alignSelf: 'flex-end'
                    }}
                    title="Filter by department"
                  >
                    <option value="active">Active dept ({currentUser?.activeDept?.name || '—'})</option>
                    {currentUser?.role === 'ADMIN' && (
                      <option value="all">All departments</option>
                    )}
                    {auditDepartmentOptions.map((d: any) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  <button
                    style={{ ...styles.riskToggle, ...(isHighRiskFilterActive ? styles.riskActive : {}), alignSelf: 'flex-end' }}
                    onClick={() => setIsHighRiskFilterActive(!isHighRiskFilterActive)}
                  >
                    High Risk Only
                  </button>
                  <button
                    style={{ ...styles.newFolderBtn, alignSelf: 'flex-end', opacity: isAuditExporting ? 0.7 : 1 }}
                    onClick={exportAuditLogsToExcel}
                    disabled={isAuditExporting || !auditDateFrom || !auditDateTo}
                    title="Download audit logs for the selected date range as an Excel-compatible file"
                  >
                    {isAuditExporting ? 'Exporting…' : 'Export to Excel'}
                  </button>
                </div>
              </div>

              <div style={styles.logsTableWrapper}>
                <table style={styles.vaultTable}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '120px' }}>Time</th>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '220px' }}>User</th>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '140px' }}>Department</th>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '160px' }}>Action</th>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '120px' }}>IP Address</th>
                      <th style={{ ...styles.vaultTh, ...styles.vaultThSticky }}>Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.length === 0 && (
                      <tr><td colSpan={6} style={styles.noLogs}>No activity logged yet.</td></tr>
                    )}
                    {auditLogs
                      .filter(log => !isHighRiskFilterActive || log.action === 'FILE_DELETE' || log.action === 'UNAUTHORIZED_ACCESS')
                      .map(log => {
                        const isHighRisk = log.action === 'FILE_DELETE' || log.action === 'UNAUTHORIZED_ACCESS';
                        const ts = new Date(log.timestamp);
                        const looksLikeUuid = typeof log.userId === 'string' && /^[0-9a-f-]{20,}$/i.test(log.userId);
                        const fallbackId = looksLikeUuid ? `${log.userId.slice(0, 8)}…` : log.userId;
                        const displayName = log.userName || (log.userId && log.userId !== 'unknown' ? fallbackId : '—');
                        let context = '-';
                        if (log.metadata) {
                          try {
                            const m = typeof log.metadata === 'string' ? JSON.parse(log.metadata) : log.metadata;
                            context = m.fileName || m.name || m.query || m.detail || m.targetUserId || '-';
                          } catch { /* leave default */ }
                        }
                        return (
                          <tr key={log.id} style={{ ...styles.vaultTr, background: isHighRisk ? 'rgba(220, 38, 38, 0.1)' : 'transparent' }}>
                            <td style={{ ...styles.vaultTd, whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{ts.toLocaleTimeString()}</span>
                                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{ts.toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td style={styles.vaultTd}>
                              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                <span style={{ fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }} title={log.userName || log.userId || ''}>
                                  {displayName}
                                </span>
                                {log.userEmail && (
                                  <span style={{ fontSize: '0.65rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }} title={log.userEmail}>
                                    {log.userEmail}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td style={{ ...styles.vaultTd, whiteSpace: 'nowrap', color: '#64748b' }}>
                              {log.departmentName || (log.departmentId ? '—' : <span style={{ fontStyle: 'italic', color: '#64748b' }}>global</span>)}
                            </td>
                            <td style={{ ...styles.vaultTd, fontWeight: '700', color: isHighRisk ? '#DC2626' : '#00A651', whiteSpace: 'nowrap' }}>{log.action}</td>
                            <td style={{ ...styles.vaultTd, whiteSpace: 'nowrap', color: '#64748b' }}>{log.ip}</td>
                            <td style={{ ...styles.vaultTd, wordBreak: 'break-word' }}>{context}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {currentUser?.role === 'ADMIN' && (
              <div style={styles.settingsSection}>
                <h3 style={styles.settingsTitle}>Global Protections</h3>
                <div style={styles.settingsGrid}>
                  <label
                    className="edocs-setting-row"
                    style={styles.settingRow}
                  >
                    <div style={styles.settingInfo}>
                      <span style={styles.settingLabel}>Dynamic Watermarking</span>
                      <span style={styles.settingDesc}>Apply user-specific watermarks to all previews</span>
                    </div>
                    <div style={styles.settingControl}>
                      <span style={{
                        ...styles.settingStatus,
                        color: tenantSettings.watermarkingEnabled ? '#00A651' : '#64748b',
                      }}>
                        {tenantSettings.watermarkingEnabled ? 'ON' : 'OFF'}
                      </span>
                      <span className="edocs-switch">
                        <input
                          type="checkbox"
                          checked={tenantSettings.watermarkingEnabled}
                          onChange={e => updateSetting('watermarkingEnabled', e.target.checked)}
                          aria-label="Dynamic Watermarking"
                        />
                        <span className="edocs-slider"></span>
                      </span>
                    </div>
                  </label>

                </div>
              </div>
              )}
            </div>
          ) : activeTab === 'DASHBOARD' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <div>
                  <h2 style={styles.vaultTitle}>System Dashboard</h2>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    Real-time overview across departments, users, documents, and security events.
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {(['24h', '7d', '30d'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setDashboardRange(r)}
                        style={{
                          ...styles.badge,
                          border: '1px solid rgba(15,23,42,0.12)',
                          background: dashboardRange === r ? 'rgba(37,99,235,0.14)' : 'rgba(15,23,42,0.04)',
                          color: dashboardRange === r ? '#1d4ed8' : '#64748b',
                          cursor: 'pointer'
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <button
                    style={{
                      ...styles.newFolderBtn,
                      width: '38px',
                      height: '38px',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => fetchDashboardData(dashboardRange)}
                    disabled={isDashboardLoading}
                    aria-label={isDashboardLoading ? 'Refreshing dashboard' : 'Refresh dashboard'}
                    title={isDashboardLoading ? 'Refreshing dashboard' : 'Refresh dashboard'}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 9a8 8 0 00-14.9-3M4 15a8 8 0 0014.9 3" />
                    </svg>
                  </button>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    Last updated: {dashboardLastUpdated ? dashboardLastUpdated.toLocaleTimeString() : '—'}
                  </span>
                </div>
              </div>

              {isDashboardLoading && !dashboardData ? (
                <div style={styles.previewLoading}>
                  <p>Aggregating system intelligence...</p>
                </div>
              ) : dashboardData ? (
                <>
                  <div style={styles.reportGrid}>
                    <div
                      className="dashboard-kpi-clickable"
                      role="button"
                      tabIndex={0}
                      onClick={() => { setDashboardDeptModalView('list'); setIsDashboardDeptModalOpen(true); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { setDashboardDeptModalView('list'); setIsDashboardDeptModalOpen(true); } }}
                      style={{ ...styles.kpiCard, borderTop: '3px solid #2563eb', background: 'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(255,255,255,0.92))', boxShadow: '0 8px 24px rgba(37,99,235,0.08)' }}
                      title="View all departments"
                    >
                      <span style={styles.kpiLabel}>Departments</span>
                      <span style={styles.kpiValue}>{dashboardData.totals.departments}</span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Click to drill down →</span>
                    </div>
                    <div style={{ ...styles.kpiCard, borderTop: '3px solid #7c3aed', background: 'linear-gradient(180deg, rgba(124,58,237,0.08), rgba(255,255,255,0.92))', boxShadow: '0 8px 24px rgba(124,58,237,0.08)' }}>
                      <span style={styles.kpiLabel}>Users</span>
                      <span style={styles.kpiValue}>{dashboardData.totals.users}</span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Platform accounts</span>
                    </div>
                    <div style={{ ...styles.kpiCard, borderTop: '3px solid #0ea5e9', background: 'linear-gradient(180deg, rgba(14,165,233,0.08), rgba(255,255,255,0.92))', boxShadow: '0 8px 24px rgba(14,165,233,0.08)' }}>
                      <span style={styles.kpiLabel}>Folders</span>
                      <span style={styles.kpiValue}>{dashboardData.totals.folders}</span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Information architecture</span>
                    </div>
                    <div style={{ ...styles.kpiCard, borderTop: '3px solid #16a34a', background: 'linear-gradient(180deg, rgba(22,163,74,0.08), rgba(255,255,255,0.92))', boxShadow: '0 8px 24px rgba(22,163,74,0.08)' }}>
                      <span style={styles.kpiLabel}>Active Documents</span>
                      <span style={styles.kpiValue}>{dashboardData.totals.documents}</span>
                      <AnimatedSparkline values={dashboardData?.trends?.docsSeries || []} color="#16a34a" animKey={dashboardRange} />
                      <span style={{ fontSize: '0.7rem', color: '#10b981' }}>
                        {dashboardData?.inRange?.docs ?? 0} in {dashboardRange}
                      </span>
                    </div>
                    <div style={{ ...styles.kpiCard, borderTop: '3px solid #dc2626', background: 'linear-gradient(180deg, rgba(220,38,38,0.08), rgba(255,255,255,0.92))', boxShadow: '0 8px 24px rgba(220,38,38,0.08)' }}>
                      <span style={styles.kpiLabel}>High Risk Alerts</span>
                      <span style={{
                        ...styles.kpiValue,
                        color: dashboardData.totals.highRisk24h > 0 ? '#DC2626' : '#10b981'
                      }}>
                        {dashboardData?.inRange?.highRisk ?? 0}
                      </span>
                      <AnimatedSparkline values={dashboardData?.trends?.highRiskSeries || []} color="#dc2626" animKey={dashboardRange} />
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {dashboardData.totals.highRisk24h} in 24h · {dashboardData.totals.highRisk7d} in 7d
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                    marginBottom: '18px'
                  }}>
                    <div style={{ ...styles.chartCard, padding: '12px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk Posture</div>
                      <div style={{ marginTop: '6px', fontSize: '0.92rem', color: dashboardData.totals.highRisk24h > 0 ? '#b91c1c' : '#15803d', fontWeight: 700 }}>
                        {dashboardData.totals.highRisk24h > 0 ? 'Attention needed' : 'Stable'}
                      </div>
                    </div>
                    <div style={{ ...styles.chartCard, padding: '12px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upload Velocity</div>
                      <div style={{ marginTop: '6px', fontSize: '0.92rem', color: '#1d4ed8', fontWeight: 700 }}>
                        {dashboardData.totals.docs24h > 0 ? `+${dashboardData.totals.docs24h} docs today` : 'No uploads today'}
                      </div>
                    </div>
                    <div style={{ ...styles.chartCard, padding: '12px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coverage</div>
                      <div style={{ marginTop: '6px', fontSize: '0.92rem', color: '#334155', fontWeight: 700 }}>
                        {dashboardData.totals.departments > 0 ? `${dashboardData.totals.documents} docs / ${dashboardData.totals.departments} depts` : 'No departments yet'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div style={styles.chartCard}>
                      <h3 style={styles.settingsTitle}>Department Snapshot</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        {dashboardData.departmentSnapshot.slice(0, 8).map((d: any) => {
                          const ratio = dashboardData.totals.documents > 0
                            ? Math.max(8, Math.round((d.documents / dashboardData.totals.documents) * 100))
                            : 8;
                          return (
                            <div
                              key={d.id}
                              className="dashboard-drill-row"
                              role="button"
                              tabIndex={0}
                              onClick={() => openDashboardDeptDetail(d.id)}
                              onKeyDown={(e) => { if (e.key === 'Enter') openDashboardDeptDetail(d.id); }}
                              style={{ display: 'grid', gridTemplateColumns: '180px 1fr 150px', gap: '10px', alignItems: 'center' }}
                            >
                              <span style={{ fontSize: '0.78rem', color: '#1e293b', fontWeight: 600 }}>{d.name}</span>
                              <div style={{ height: '8px', background: 'rgba(15,23,42,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: `${ratio}%`, height: '100%', background: 'linear-gradient(90deg, #00A651, #16a34a)' }} />
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                {d.documents} docs · {d.users} users
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={styles.chartCard}>
                      <h3 style={styles.settingsTitle}>Top Contributors</h3>
                      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {dashboardData.topContributors.length === 0 ? (
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No activity captured yet.</div>
                        ) : dashboardData.topContributors.map((u: any, idx: number) => (
                          <div key={u.userId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.06)', paddingBottom: '6px' }}>
                            <div>
                              <div style={{ fontSize: '0.8rem', color: '#1e293b', fontWeight: 600 }}>{idx + 1}. {u.userName}</div>
                              {u.userEmail && <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{u.userEmail}</div>}
                            </div>
                            <span style={{ ...styles.badge, background: 'rgba(37,99,235,0.12)', color: '#1d4ed8' }}>
                              {u.actions} actions
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(['ALL', 'HIGH_RISK', 'FILES', 'AUTH'] as const).map((filterKey) => (
                        <button
                          key={filterKey}
                          onClick={() => setDashboardActivityFilter(filterKey)}
                          style={{
                            ...styles.badge,
                            border: '1px solid rgba(15,23,42,0.12)',
                            background: dashboardActivityFilter === filterKey ? 'rgba(37,99,235,0.14)' : 'rgba(15,23,42,0.04)',
                            color: dashboardActivityFilter === filterKey ? '#1d4ed8' : '#64748b',
                            cursor: 'pointer'
                          }}
                        >
                          {filterKey === 'ALL' ? 'All' : filterKey === 'HIGH_RISK' ? 'High Risk' : filterKey === 'FILES' ? 'File Events' : 'Auth Events'}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={dashboardActivitySearch}
                      onChange={(e) => setDashboardActivitySearch(e.target.value)}
                      placeholder="Search activity..."
                      style={{ ...styles.modalInput, minWidth: '260px', maxWidth: '320px' }}
                    />
                  </div>

                  <div style={{ ...styles.chartCard, padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '10px', flexWrap: 'wrap' }}>
                      <h3 style={{ ...styles.settingsTitle, margin: 0 }}>Activity Timeline</h3>
                      <AnimatedSparkline values={dashboardData?.trends?.activitySeries || []} color="#2563eb" animKey={dashboardRange} />
                    </div>
                    <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                      {filteredDashboardActivity.length === 0 ? (
                        <div style={styles.noLogs}>No activity logs found for this filter.</div>
                      ) : filteredDashboardActivity.map((log: any) => {
                        const action = String(log.action || '').toUpperCase();
                        const isHighRisk = action.includes('HIGH_RISK') || action.includes('FAILED') || action.includes('UNAUTHORIZED');
                        const dotColor = isHighRisk ? '#dc2626' : '#2563eb';
                        return (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: '10px', marginBottom: '10px' }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: dotColor, marginTop: '4px', boxShadow: `0 0 0 3px ${isHighRisk ? 'rgba(220,38,38,0.15)' : 'rgba(37,99,235,0.15)'}` }} />
                              <span style={{ flex: 1, width: '2px', background: 'rgba(15,23,42,0.08)', marginTop: '4px' }} />
                            </div>
                            <div
                              className="dashboard-timeline-item"
                              role="button"
                              tabIndex={0}
                              onClick={() => setSelectedAuditLog(log)}
                              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedAuditLog(log); }}
                              style={{ border: '1px solid rgba(15,23,42,0.08)', borderRadius: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.75)' }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{log.userName || log.userId || 'Unknown user'}</div>
                                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{new Date(log.timestamp).toLocaleString()}</div>
                              </div>
                              {log.userEmail && <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>{log.userEmail}</div>}
                              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{
                                  ...styles.badge,
                                  background: isHighRisk ? 'rgba(220,38,38,0.12)' : 'rgba(37,99,235,0.12)',
                                  color: isHighRisk ? '#b91c1c' : '#1d4ed8'
                                }}>
                                  {log.action}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                  Dept: {deptNameById(log.departmentId)}
                                </span>
                                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginLeft: '6px' }}>Click for details</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.previewLoading}>
                  <p>Unable to load dashboard right now.</p>
                </div>
              )}
            </div>
          ) : activeTab === 'DEPT' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <h2 style={styles.vaultTitle}>Departments</h2>
              </div>

              {currentUser?.role === 'ADMIN' && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{ ...styles.settingsTitle, marginTop: 0 }}>Create Department</h3>
                  <p style={styles.modalSubtext}>
                    New departments are immediately available for user assignment and folder creation.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <input
                      style={{ ...styles.modalInput, flex: 1, minWidth: '220px' }}
                      placeholder="e.g. Legal, Operations, Marketing"
                      value={newDeptName}
                      onChange={(e) => { setNewDeptName(e.target.value); if (deptError) setDeptError(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') createDepartment(); }}
                      maxLength={80}
                      disabled={isCreatingDept}
                    />
                    <button
                      style={{
                        ...styles.newFolderBtn,
                        opacity: isCreatingDept || !newDeptName.trim() ? 0.6 : 1,
                        cursor: isCreatingDept || !newDeptName.trim() ? 'not-allowed' : 'pointer'
                      }}
                      onClick={createDepartment}
                      disabled={isCreatingDept || !newDeptName.trim()}
                    >
                      {isCreatingDept ? 'Creating...' : '+ Create Department'}
                    </button>
                  </div>

                  <div style={{ marginTop: '14px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Default permission set
                      <span style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'none', letterSpacing: 0, marginLeft: '6px' }}>
                        (applied to new members on assignment)
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      <button
                        type="button"
                        disabled={isCreatingDept}
                        onClick={() => setNewDeptPresetId('')}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: `1px solid ${!newDeptPresetId ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                          background: !newDeptPresetId ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                          color: !newDeptPresetId ? '#00A651' : '#475569',
                          cursor: isCreatingDept ? 'not-allowed' : 'pointer'
                        }}
                        title="No default — fall back to role-based defaults (HOD = full, MEMBER = view + upload)"
                      >
                        None
                      </button>
                      {PERMISSION_PRESETS.map(p => {
                        const active = newDeptPresetId === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            disabled={isCreatingDept}
                            onClick={() => setNewDeptPresetId(p.id)}
                            title={p.description}
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              padding: '4px 10px',
                              borderRadius: '999px',
                              border: `1px solid ${active ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                              background: active ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                              color: active ? '#00A651' : '#475569',
                              cursor: isCreatingDept ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {deptError && (
                    <div style={{ marginTop: '10px', color: '#DC2626', fontSize: '0.8rem' }}>
                      {deptError}
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ ...styles.settingsTitle, marginTop: 0, marginBottom: '12px' }}>
                  Departments ({availableDepts.length})
                </h3>
                <div style={styles.logsTableWrapper}>
                  <table style={styles.vaultTable}>
                    <thead>
                      <tr>
                        <th style={styles.vaultTh}>Name</th>
                        <th style={styles.vaultTh}>Members</th>
                        <th style={styles.vaultTh}>Folders</th>
                        <th style={styles.vaultTh}>Documents</th>
                        <th style={styles.vaultTh}>Default permission set</th>
                        {currentUser?.role === 'ADMIN' && (
                          <th style={{ ...styles.vaultTh, width: '90px', textAlign: 'right' }}>Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {availableDepts.length === 0 ? (
                        <tr>
                          <td colSpan={currentUser?.role === 'ADMIN' ? 6 : 5} style={styles.noLogs}>
                            No departments yet{currentUser?.role === 'ADMIN' ? ' — create one above.' : '.'}
                          </td>
                        </tr>
                      ) : availableDepts.map((d: any) => {
                        const colors = getLabelColor(d.name);
                        const currentPreset: string | null = d.defaultPermissionPreset || null;
                        const isAdmin = currentUser?.role === 'ADMIN';
                        const isSaving = deptPresetSaving === d.id;
                        return (
                          <tr key={d.id} style={styles.vaultTr}>
                            <td style={styles.vaultTd}>
                              <span style={{
                                ...styles.badge,
                                background: colors.bg,
                                color: colors.base,
                                border: `1px solid ${colors.border}`
                              }}>
                                {d.name}
                              </span>
                            </td>
                            <td style={styles.vaultTd}>{d._count?.users ?? 0}</td>
                            <td style={styles.vaultTd}>{d._count?.folders ?? 0}</td>
                            <td style={styles.vaultTd}>{d._count?.documents ?? 0}</td>
                            <td style={styles.vaultTd}>
                              {isAdmin ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => setDepartmentDefaultPreset(d.id, null)}
                                    title="No default — fall back to role-based defaults"
                                    style={{
                                      fontSize: '0.65rem',
                                      fontWeight: 600,
                                      padding: '3px 8px',
                                      borderRadius: '999px',
                                      border: `1px solid ${!currentPreset ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                                      background: !currentPreset ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                                      color: !currentPreset ? '#00A651' : '#475569',
                                      cursor: isSaving ? 'wait' : 'pointer',
                                      opacity: isSaving ? 0.6 : 1
                                    }}
                                  >
                                    None
                                  </button>
                                  {PERMISSION_PRESETS.map(p => {
                                    const active = currentPreset === p.id;
                                    return (
                                      <button
                                        key={p.id}
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => setDepartmentDefaultPreset(d.id, p.id)}
                                        title={p.description}
                                        style={{
                                          fontSize: '0.65rem',
                                          fontWeight: 600,
                                          padding: '3px 8px',
                                          borderRadius: '999px',
                                          border: `1px solid ${active ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                                          background: active ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                                          color: active ? '#00A651' : '#475569',
                                          cursor: isSaving ? 'wait' : 'pointer',
                                          opacity: isSaving ? 0.6 : 1
                                        }}
                                      >
                                        {p.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: currentPreset ? '#0f172a' : '#94a3b8' }}>
                                  {currentPreset
                                    ? (PERMISSION_PRESETS.find(p => p.id === currentPreset)?.label || currentPreset)
                                    : '—'}
                                </span>
                              )}
                            </td>
                            {isAdmin && (() => {
                              const hasContent = (d._count?.folders ?? 0) > 0 || (d._count?.documents ?? 0) > 0;
                              return (
                                <td style={{ ...styles.vaultTd, textAlign: 'right' }}>
                                  <button
                                    type="button"
                                    aria-label={`Delete ${d.name}`}
                                    title={hasContent
                                      ? 'Move or delete this department’s folders and documents before deleting it'
                                      : `Delete ${d.name}`}
                                    onClick={() => deleteDepartment(d)}
                                    disabled={isSaving}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 32,
                                      height: 32,
                                      borderRadius: 8,
                                      border: '1px solid rgba(220, 38, 38, 0.18)',
                                      background: hasContent ? '#f8fafc' : 'rgba(220, 38, 38, 0.06)',
                                      color: hasContent ? '#94a3b8' : '#DC2626',
                                      cursor: isSaving ? 'wait' : 'pointer',
                                      opacity: isSaving ? 0.6 : 1,
                                      transition: 'background 0.15s, color 0.15s'
                                    }}
                                    onMouseEnter={(e) => {
                                      if (hasContent || isSaving) return;
                                      e.currentTarget.style.background = '#DC2626';
                                      e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                      if (hasContent || isSaving) return;
                                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)';
                                      e.currentTarget.style.color = '#DC2626';
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                      <path d="M10 11v6" />
                                      <path d="M14 11v6" />
                                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                                    </svg>
                                  </button>
                                </td>
                              );
                            })()}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'USERS' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <h2 style={styles.vaultTitle}>User Management</h2>
              </div>

              {currentUser?.role === 'ADMIN' && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ ...styles.settingsTitle, marginTop: 0, marginBottom: 0 }}>Create User</h3>
                    <button
                      style={{ ...styles.newFolderBtn, background: isUserPanelOpen ? 'transparent' : undefined }}
                      onClick={() => {
                        if (isUserPanelOpen) resetNewUserForm();
                        setIsUserPanelOpen(o => !o);
                      }}
                    >
                      {isUserPanelOpen ? 'Cancel' : '+ New User'}
                    </button>
                  </div>
                  <p style={styles.modalSubtext}>
                    Provision a new account with login credentials, a global role, and department assignments.
                  </p>

                  {isUserPanelOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Full Name</label>
                          <input
                            style={styles.modalInput}
                            value={newUserForm.name}
                            onChange={(e) => setNewUserForm(p => ({ ...p, name: e.target.value }))}
                            disabled={isCreatingUser}
                            maxLength={80}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Email (login ID)</label>
                          <input
                            style={styles.modalInput}
                            type="email"
                            value={newUserForm.email}
                            onChange={(e) => setNewUserForm(p => ({ ...p, email: e.target.value }))}
                            disabled={isCreatingUser}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Password</label>
                          <input
                            style={styles.modalInput}
                            type={showNewUserPassword ? 'text' : 'password'}
                            value={newUserForm.password}
                            onChange={(e) => setNewUserForm(p => ({ ...p, password: e.target.value }))}
                            disabled={isCreatingUser}
                            autoComplete="new-password"
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Confirm Password</label>
                          <input
                            style={styles.modalInput}
                            type={showNewUserPassword ? 'text' : 'password'}
                            value={newUserForm.confirmPassword}
                            onChange={(e) => setNewUserForm(p => ({ ...p, confirmPassword: e.target.value }))}
                            disabled={isCreatingUser}
                            autoComplete="new-password"
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Global Role</label>
                          <select
                            style={styles.modalInput as React.CSSProperties}
                            value={newUserForm.role}
                            onChange={(e) => setNewUserForm(p => ({ ...p, role: e.target.value as 'ADMIN' | 'SUB_ADMIN' | 'HOD' | 'USER' }))}
                            disabled={isCreatingUser}
                          >
                            <option value="USER">USER — standard access</option>
                            <option value="HOD">HOD — head of department</option>
                            <option value="SUB_ADMIN">SUB_ADMIN — full access except Security Vault</option>
                            <option value="ADMIN">ADMIN — full system access</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          id="show-new-pwd"
                          type="checkbox"
                          checked={showNewUserPassword}
                          onChange={(e) => setShowNewUserPassword(e.target.checked)}
                          disabled={isCreatingUser}
                        />
                        <label htmlFor="show-new-pwd" style={{ fontSize: '0.75rem', color: '#64748b' }}>Show passwords</label>
                      </div>

                      {newUserForm.role === 'ADMIN' && (
                        <div style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(251, 191, 36, 0.08)',
                          border: '1px solid rgba(251, 191, 36, 0.25)'
                        }}>
                          <div style={{ fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
                            Global ADMIN — All Rights
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#fde68a', marginBottom: '4px' }}>
                            {ALL_PERMS.join(' · ')}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                            ADMIN users automatically have every permission across all departments. The per-department checkboxes below are stored for record only.
                          </div>
                        </div>
                      )}

                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#334155', marginBottom: '8px' }}>
                          Department Assignments ({newUserForm.assignments.length})
                        </div>
                        {availableDepts.length === 0 ? (
                          <div style={{ ...styles.modalSubtext }}>No departments yet — create one above to assign access.</div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {availableDepts.map((dept: any) => {
                              const assignment = newUserForm.assignments.find(a => a.departmentId === dept.id);
                              const checked = !!assignment;
                              return (
                                <div
                                  key={dept.id}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    padding: '10px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    background: checked ? 'rgba(0, 166, 81, 0.05)' : 'transparent'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}>
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleNewUserAssignment(dept.id)}
                                        disabled={isCreatingUser}
                                      />
                                      <span style={{ fontSize: '0.85rem', color: '#1e293b' }}>{dept.name}</span>
                                    </label>
                                    {checked && (
                                      <>
                                        <select
                                          style={{ ...styles.modalInput, padding: '6px 8px', fontSize: '0.75rem' } as React.CSSProperties}
                                          value={assignment!.role}
                                          onChange={(e) => setNewUserAssignmentRole(dept.id, e.target.value as 'MEMBER' | 'HOD')}
                                          disabled={isCreatingUser}
                                        >
                                          <option value="MEMBER">MEMBER</option>
                                          <option value="HOD">HOD</option>
                                        </select>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#64748b' }}>
                                          <input
                                            type="radio"
                                            name="new-user-primary"
                                            checked={assignment!.isPrimary}
                                            onChange={() => setNewUserPrimary(dept.id)}
                                            disabled={isCreatingUser}
                                          />
                                          Primary
                                        </label>
                                      </>
                                    )}
                                  </div>
                                  {checked && (
                                    <div style={{ paddingLeft: '24px' }}>
                                      <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>Permission set</span>
                                        {(() => {
                                          const matched = matchPermissionPreset(assignment!.permissions);
                                          return (
                                            <span style={{ fontSize: '0.6rem', color: matched ? '#00A651' : '#94a3b8', textTransform: 'none', letterSpacing: 0 }}>
                                              {matched ? matched.label : 'Custom'}
                                            </span>
                                          );
                                        })()}
                                      </div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                        {PERMISSION_PRESETS.map((preset: PermissionPreset) => {
                                          const active = matchPermissionPreset(assignment!.permissions)?.id === preset.id;
                                          return (
                                            <button
                                              key={preset.id}
                                              type="button"
                                              title={preset.description}
                                              disabled={isCreatingUser}
                                              onClick={() => {
                                                setNewUserForm(prev => ({
                                                  ...prev,
                                                  assignments: prev.assignments.map(a =>
                                                    a.departmentId === dept.id
                                                      ? { ...a, permissions: [...preset.permissions] as PermissionCode[] }
                                                      : a
                                                  )
                                                }));
                                              }}
                                              style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                padding: '4px 10px',
                                                borderRadius: '999px',
                                                border: `1px solid ${active ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                                                background: active ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                                                color: active ? '#00A651' : '#475569',
                                                cursor: isCreatingUser ? 'not-allowed' : 'pointer',
                                                opacity: isCreatingUser ? 0.6 : 1
                                              }}
                                            >
                                              {preset.label}
                                            </button>
                                          );
                                        })}
                                      </div>
                                      <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        Fine-tune
                                      </div>
                                      <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                                        gap: '6px 14px'
                                      }}>
                                        {ALL_PERMS.map(perm => {
                                          const active = assignment!.permissions.includes(perm);
                                          const isView = perm === 'VIEW';
                                          const inputId = `newuser-${dept.id}-${perm}`;
                                          return (
                                            <label
                                              key={perm}
                                              htmlFor={inputId}
                                              title={isView ? 'VIEW is always granted' : ''}
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                fontSize: '0.75rem',
                                                color: active ? '#1e293b' : '#64748b',
                                                cursor: isCreatingUser || isView ? 'default' : 'pointer',
                                                opacity: isView ? 0.85 : 1
                                              }}
                                            >
                                              <input
                                                id={inputId}
                                                type="checkbox"
                                                checked={active}
                                                disabled={isCreatingUser || isView}
                                                onChange={() => toggleNewUserPermission(dept.id, perm)}
                                                style={{ accentColor: '#00A651' }}
                                              />
                                              <span>{PERMISSION_LABELS[perm]}</span>
                                              {isView && (
                                                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>(required)</span>
                                              )}
                                            </label>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {userError && (
                        <div style={{ color: '#DC2626', fontSize: '0.8rem' }}>{userError}</div>
                      )}
                      {userSuccess && (
                        <div style={{ color: '#10b981', fontSize: '0.8rem' }}>{userSuccess}</div>
                      )}

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          style={{ ...styles.newFolderBtn, background: 'transparent' }}
                          onClick={() => { resetNewUserForm(); setIsUserPanelOpen(false); }}
                          disabled={isCreatingUser}
                        >
                          Close
                        </button>
                        <button
                          style={{
                            ...styles.newFolderBtn,
                            opacity: isCreatingUser ? 0.6 : 1,
                            cursor: isCreatingUser ? 'not-allowed' : 'pointer'
                          }}
                          onClick={createUser}
                          disabled={isCreatingUser}
                        >
                          {isCreatingUser ? 'Creating...' : 'Create User'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ ...styles.settingsTitle, marginTop: 0, marginBottom: 0 }}>
                  Users ({filteredUsers.length}{normalizedUserSearch ? ` of ${users.length}` : ''})
                </h3>
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search user, email, role, or department"
                  style={{ ...styles.modalInput, minWidth: '320px', maxWidth: '420px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span style={styles.badge}>Total: {users.length}</span>
                <span style={styles.badge}>Admins: {users.filter((u: any) => u.role === 'ADMIN').length}</span>
                <span style={styles.badge}>Sub-Admins: {users.filter((u: any) => u.role === 'SUB_ADMIN').length}</span>
                <span style={styles.badge}>HODs: {users.filter((u: any) => u.role === 'HOD').length}</span>
              </div>
              <div style={styles.logsTableWrapper}>
                <table style={styles.vaultTable}>
                  <thead>
                    <tr>
                      <th style={styles.vaultTh}>User</th>
                      <th style={styles.vaultTh}>Assigned Departments</th>
                      <th style={styles.vaultTh}>Global Role</th>
                      <th style={styles.vaultTh}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => {
                      const isUserAdmin = u.role === 'ADMIN' || u.role === 'SUB_ADMIN';
                      const isUserSubAdmin = u.role === 'SUB_ADMIN';
                      return (
                      <tr key={u.id} style={styles.vaultTr}>
                        <td style={styles.vaultTd}>
                          <div style={{ fontWeight: '600' }}>{u.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{u.email}</div>
                          <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>ID: {u.id}</div>
                        </td>
                        <td style={styles.vaultTd}>
                          {isUserAdmin && (
                            <div style={{
                              marginBottom: '8px',
                              padding: '6px 8px',
                              borderRadius: '6px',
                              background: 'rgba(251, 191, 36, 0.08)',
                              border: '1px solid rgba(251, 191, 36, 0.25)'
                            }}>
                              <div style={{ fontSize: '0.6rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 700, marginBottom: '2px' }}>
                                Global Permissions ({isUserSubAdmin ? 'SUB_ADMIN' : 'ADMIN'})
                              </div>
                              <div style={{ fontSize: '0.65rem', color: '#fde68a' }}>
                                {ALL_PERMS.join(' · ')}
                                {isUserSubAdmin && (
                                  <span style={{ display: 'block', marginTop: '2px', color: '#fcd34d' }}>
                                    Excludes Security Vault access
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {u.departments?.map((ud: any) => {
                              const storedPerms: string[] = Array.isArray(ud.permissionsList)
                                ? ud.permissionsList
                                : (ud.permissions ? String(ud.permissions).split(',').map((p: string) => p.trim()).filter(Boolean) : []);
                              const perms = isUserAdmin ? ALL_PERMS : storedPerms;
                              return (
                                <div key={ud.departmentId} style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                                  <span style={{
                                    ...styles.badge,
                                    background: ud.isPrimary ? 'rgba(0, 166, 81, 0.2)' : 'rgba(15, 23, 42, 0.05)',
                                    color: ud.isPrimary ? '#00A651' : '#64748b',
                                    fontSize: '0.65rem'
                                  }}>
                                    {ud.department.name} ({ud.role})
                                    {ud.isPrimary && ' ★'}
                                  </span>
                                  {perms.length > 0 && (
                                    <span style={{ fontSize: '0.6rem', color: isUserAdmin ? '#fbbf24' : '#64748b' }}>
                                      {perms.join(' · ')}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td style={styles.vaultTd}>
                          <span style={{
                            ...styles.badge,
                            background: isUserAdmin ? 'rgba(251, 191, 36, 0.15)' : 'rgba(15, 23, 42, 0.05)',
                            color: isUserAdmin ? '#fbbf24' : '#64748b',
                            fontSize: '0.7rem',
                            fontWeight: 700
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={styles.vaultTd}>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {(currentUser?.role === 'ADMIN' || currentUser?.role === 'HOD') && (
                              <button 
                                style={styles.manageBtn}
                                onClick={() => {
                                  setSelectedUserForAssignment(u);
                                  fetchAvailableDepts();
                                  fetchUserAssignments(u.id);
                                  setIsAssignmentPanelOpen(true);
                                }}
                              >
                                Manage Access
                              </button>
                            )}
                            {currentUser?.role === 'ADMIN' && (
                              <button
                                style={{
                                  ...styles.manageBtn,
                                  background: 'rgba(37, 99, 235, 0.12)',
                                  border: '1px solid rgba(37, 99, 235, 0.3)',
                                  color: '#1d4ed8'
                                }}
                                onClick={() => openAdminPasswordModal(u)}
                              >
                                Reset Password
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ ...styles.vaultTd, textAlign: 'center', color: '#64748b' }}>
                          No users match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'REPORTS' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <h2 style={styles.vaultTitle}>
                  Performance Report: {
                    reportDeptId === 'active'
                      ? (currentUser?.activeDept?.name || '—')
                      : (availableDepts.find((d: any) => d.id === reportDeptId)?.name || '—')
                  }
                </h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {currentUser?.role === 'ADMIN' && (
                    <select
                      value={reportDeptId}
                      onChange={e => {
                        const v = e.target.value;
                        setReportDeptId(v);
                        fetchReportData(v);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        color: '#1e293b',
                        border: '1px solid rgba(15,23,42,0.1)',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem'
                      }}
                      title="Switch department report"
                    >
                      <option value="active">Active dept ({currentUser?.activeDept?.name || '—'})</option>
                      {availableDepts.map((d: any) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  )}
                  <button
                    style={styles.newFolderBtn}
                    onClick={() => fetchReportData()}
                    disabled={isReportLoading}
                  >
                    {isReportLoading ? 'Refreshing...' : 'Refresh Data'}
                  </button>
                </div>
              </div>

              {reportData ? (
                <>
                  {/* KPI Grid */}
                  <div style={styles.reportGrid}>
                    <div style={styles.kpiCard}>
                      <span style={styles.kpiLabel}>Total Assets</span>
                      <span style={styles.kpiValue}>{reportData.totalDocs}</span>
                      <span style={{ fontSize: '0.7rem', color: '#10b981' }}>+12% from last month</span>
                    </div>
                    <div style={styles.kpiCard}>
                      <span style={styles.kpiLabel}>Active Shares</span>
                      <span style={styles.kpiValue}>{reportData.activeSharedLinks}</span>
                      <span style={{ fontSize: '0.7rem', color: '#2563EB' }}>External collaboration active</span>
                    </div>
                    <div style={styles.kpiCard}>
                      <span style={styles.kpiLabel}>Top Contributor</span>
                      <span style={styles.kpiValue}>{reportData.topUsers[0]?.name || '-'}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{reportData.topUsers[0]?.count || 0} actions recorded</span>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div style={styles.chartCard}>
                      <h3 style={styles.settingsTitle}>Distribution by Label</h3>
                      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Simple SVG Pie Chart */}
                        <svg viewBox="0 0 32 32" style={{ width: '150px', height: '150px', transform: 'rotate(-90deg)', borderRadius: '50%' }}>
                          {reportData.labelDistribution.length > 0 ? reportData.labelDistribution.reduce((acc: any, item: any, i: number) => {
                            const total = reportData.totalDocs || 1;
                            const percentage = (item.count / total) * 100;
                            const offset = acc.offset;
                            const color = getLabelColor(item.name).base;
                            acc.elements.push(
                              <circle 
                                key={item.name}
                                r="16" cx="16" cy="16" 
                                fill="transparent"
                                stroke={color}
                                strokeWidth="32"
                                strokeDasharray={`${percentage} 100`}
                                strokeDashoffset={`-${offset}`}
                              />
                            );
                            acc.offset += percentage;
                            return acc;
                          }, { elements: [], offset: 0 }).elements : (
                            <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
                          )}
                        </svg>
                        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {reportData.labelDistribution.map((item: any) => (
                            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: getLabelColor(item.name).base }}></div>
                              <span style={{ fontSize: '0.75rem', color: '#1e293b' }}>{item.name}: {item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={styles.chartCard}>
                      <h3 style={styles.settingsTitle}>Weekly Ingest Trend</h3>
                      <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 12px 24px 12px' }}>
                        {reportData.weeklyTrends.slice().reverse().map((trend: any) => {
                          const max = Math.max(...reportData.weeklyTrends.map((t: any) => t.count)) || 1;
                          const height = (trend.count / max) * 150;
                          return (
                            <div key={trend.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                              <div style={{ 
                                width: '100%', 
                                height: `${height}px`, 
                                background: 'linear-gradient(to top, #00A651, #34D27A)', 
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 0.5s ease'
                              }}></div>
                              <span style={{ fontSize: '0.65rem', color: '#64748b', whiteSpace: 'nowrap' }}>{trend.week}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Security Watch */}
                  <div style={styles.chartCard}>
                    <h3 style={styles.settingsTitle}>Security Watch: Critical Alerts</h3>
                    <div style={styles.logsTableWrapper}>
                      <table style={styles.vaultTable}>
                        <thead>
                          <tr>
                            <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '110px' }}>Time</th>
                            <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '200px' }}>User</th>
                            <th style={{ ...styles.vaultTh, ...styles.vaultThSticky, width: '160px' }}>Action</th>
                            <th style={{ ...styles.vaultTh, ...styles.vaultThSticky }}>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.securityWatch.length > 0 ? reportData.securityWatch.map((log: any) => {
                            const ts = new Date(log.timestamp);
                            const looksLikeUuid = typeof log.userId === 'string' && /^[0-9a-f-]{20,}$/i.test(log.userId);
                            const fallbackId = looksLikeUuid ? `${log.userId.slice(0, 8)}…` : log.userId;
                            const displayName = log.userName || (log.userId && log.userId !== 'unknown' ? fallbackId : '—');
                            let details = '-';
                            if (log.metadata) {
                              try {
                                const m = typeof log.metadata === 'string' ? JSON.parse(log.metadata) : log.metadata;
                                details = m.detail || m.fileName || m.name || m.query || '-';
                              } catch { /* leave default */ }
                            }
                            return (
                              <tr key={log.id} style={styles.vaultTr}>
                                <td style={{ ...styles.vaultTd, whiteSpace: 'nowrap' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{ts.toLocaleTimeString()}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{ts.toLocaleDateString()}</span>
                                  </div>
                                </td>
                                <td style={styles.vaultTd}>
                                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <span style={{ fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }} title={log.userName || log.userId || ''}>
                                      {displayName}
                                    </span>
                                    {log.userEmail && (
                                      <span style={{ fontSize: '0.65rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }} title={log.userEmail}>
                                        {log.userEmail}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td style={{ ...styles.vaultTd, color: '#DC2626', fontWeight: '700', whiteSpace: 'nowrap' }}>{log.action}</td>
                                <td style={{ ...styles.vaultTd, wordBreak: 'break-word' }}>{details}</td>
                              </tr>
                            );
                          }) : (
                            <tr><td colSpan={4} style={styles.noLogs}>No critical alerts in this period.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.previewLoading}>
                  <p>Aggregating department intelligence...</p>
                </div>
              )}
            </div>
          ) : activeTab === 'OVERSIGHT' ? (
            <div style={styles.vaultContainer}>
              <div style={styles.vaultHeader}>
                <h2 style={styles.vaultTitle}>Department Oversight</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {oversightSelectedDept && (
                    <button
                      style={{
                        background: 'transparent',
                        color: '#64748b',
                        border: '1px solid rgba(15,23,42,0.1)',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => { setOversightSelectedDept(null); setOversightDetail(null); }}
                    >
                      ← Back to all departments
                    </button>
                  )}
                  <button
                    style={styles.newFolderBtn}
                    onClick={() => oversightSelectedDept ? openOversightDetail(oversightSelectedDept) : fetchOversight()}
                    disabled={isOversightLoading || isOversightDetailLoading}
                  >
                    {(isOversightLoading || isOversightDetailLoading) ? 'Refreshing…' : 'Refresh'}
                  </button>
                </div>
              </div>

              {!oversightSelectedDept ? (
                isOversightLoading && !oversightData ? (
                  <div style={styles.previewLoading}><p>Loading cross-department intelligence…</p></div>
                ) : oversightData ? (
                  <>
                    <div style={styles.reportGrid}>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Departments</span>
                        <span style={styles.kpiValue}>{oversightData.departments.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Total Documents</span>
                        <span style={styles.kpiValue}>{oversightData.totals.documents}</span>
                        <span style={{ fontSize: '0.7rem', color: '#10b981' }}>+{oversightData.totals.docs7d} this week</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Total Users</span>
                        <span style={styles.kpiValue}>{oversightData.totals.users}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>High-risk events</span>
                        <span style={{ ...styles.kpiValue, color: oversightData.totals.highRisk24h > 0 ? '#DC2626' : '#10b981' }}>
                          {oversightData.totals.highRisk24h}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>last 24h · {oversightData.totals.highRisk7d} last 7d</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: '14px',
                      marginTop: '18px'
                    }}>
                      {oversightData.departments.map((d: any) => {
                        const hasAlerts = d.highRisk24h > 0;
                        return (
                          <div
                            key={d.id}
                            style={{
                              background: 'rgba(255, 255, 255, 0.6)',
                              border: hasAlerts ? '1px solid rgba(220, 38, 38, 0.35)' : '1px solid rgba(15,23,42,0.06)',
                              borderRadius: '12px',
                              padding: '16px',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px'
                            }}
                            onClick={() => openOversightDetail(d.id)}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1rem' }}>{d.name}</h3>
                              {hasAlerts && (
                                <span style={{
                                  fontSize: '0.6rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.05em',
                                  color: '#DC2626',
                                  background: 'rgba(220, 38, 38, 0.12)',
                                  padding: '3px 8px',
                                  borderRadius: '999px'
                                }}>
                                  {d.highRisk24h} alert{d.highRisk24h === 1 ? '' : 's'} · 24h
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.7rem', color: '#64748b' }}>
                              <span><strong style={{ color: '#1e293b' }}>{d.users}</strong> users</span>
                              <span><strong style={{ color: '#1e293b' }}>{d.folders}</strong> folders</span>
                              <span><strong style={{ color: '#1e293b' }}>{d.documents}</strong> docs</span>
                              <span style={{ color: '#10b981' }}>+{d.docs7d}/7d</span>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(15,23,42,0.05)', paddingTop: '8px' }}>
                              <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                                Recent activity
                              </div>
                              {d.recentLogs.length === 0 ? (
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>No recent activity.</div>
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  {d.recentLogs.slice(0, 3).map((l: any) => (
                                    <div key={l.id} style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', gap: '6px', minWidth: 0 }}>
                                      <span style={{ color: l.action === 'FILE_DELETE' || l.action === 'UNAUTHORIZED_ACCESS' ? '#DC2626' : '#00A651', fontWeight: 600, flexShrink: 0 }}>{l.action}</span>
                                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        by {l.userName || l.userId?.slice(0, 8) || 'unknown'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                              Last activity: {d.lastActivity ? new Date(d.lastActivity).toLocaleString() : '—'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={styles.previewLoading}><p>No data yet.</p></div>
                )
              ) : (
                isOversightDetailLoading && !oversightDetail ? (
                  <div style={styles.previewLoading}><p>Loading department details…</p></div>
                ) : oversightDetail ? (
                  <>
                    <div style={styles.reportGrid}>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Documents</span>
                        <span style={styles.kpiValue}>{oversightDetail.documents.length === 25 ? '25+' : oversightDetail.documents.length}</span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>recent in this dept</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Folders</span>
                        <span style={styles.kpiValue}>{oversightDetail.folders.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Members</span>
                        <span style={styles.kpiValue}>{oversightDetail.members.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>High-risk · 7d</span>
                        <span style={{ ...styles.kpiValue, color: oversightDetail.highRisk7d > 0 ? '#DC2626' : '#10b981' }}>
                          {oversightDetail.highRisk7d}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                      gap: '18px',
                      marginTop: '18px'
                    }}>
                      <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,23,42,0.06)', borderRadius: '12px', padding: '14px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '0.95rem' }}>Recent documents</h3>
                        {oversightDetail.documents.length === 0 ? (
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No documents in this department yet.</div>
                        ) : (
                          <table style={styles.vaultTable}>
                            <thead>
                              <tr>
                                <th style={styles.vaultTh}>Name</th>
                                <th style={styles.vaultTh}>Uploader</th>
                                <th style={styles.vaultTh}>Folder</th>
                                <th style={styles.vaultTh}>Created</th>
                              </tr>
                            </thead>
                            <tbody>
                              {oversightDetail.documents.map((doc: any) => (
                                <tr key={doc.id} style={styles.vaultTr}>
                                  <td style={styles.vaultTd}>
                                    <button
                                      onClick={() => { setSelectedDocId(doc.id); recordClientAudit('FILE_VIEW', { documentId: doc.id, fileName: doc.name, source: 'oversight' }); }}
                                      style={{ background: 'transparent', border: 0, color: '#2563EB', cursor: 'pointer', padding: 0, fontWeight: 600, textAlign: 'left' }}
                                    >
                                      {doc.name}
                                    </button>
                                  </td>
                                  <td style={styles.vaultTd}>{doc.uploader?.name || '—'}</td>
                                  <td style={styles.vaultTd}>{doc.folder?.name || <span style={{ color: '#64748b' }}>root</span>}</td>
                                  <td style={{ ...styles.vaultTd, whiteSpace: 'nowrap' }}>{new Date(doc.createdAt).toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,23,42,0.06)', borderRadius: '12px', padding: '14px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '0.95rem' }}>Recent activity</h3>
                        {oversightDetail.activity.length === 0 ? (
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No audit events recorded.</div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                            {oversightDetail.activity.map((l: any) => {
                              const isHighRisk = l.action === 'FILE_DELETE' || l.action === 'UNAUTHORIZED_ACCESS' || l.action === 'HIGH_RISK_ALERT';
                              let ctx = '';
                              if (l.metadata) {
                                try {
                                  const m = typeof l.metadata === 'string' ? JSON.parse(l.metadata) : l.metadata;
                                  ctx = m.fileName || m.name || m.query || m.detail || '';
                                } catch {}
                              }
                              return (
                                <div key={l.id} style={{
                                  borderLeft: `3px solid ${isHighRisk ? '#DC2626' : '#00A651'}`,
                                  padding: '6px 10px',
                                  background: isHighRisk ? 'rgba(220, 38, 38, 0.06)' : 'rgba(0, 166, 81, 0.03)',
                                  borderRadius: '4px'
                                }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.75rem', color: isHighRisk ? '#DC2626' : '#00A651' }}>{l.action}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{new Date(l.timestamp).toLocaleString()}</span>
                                  </div>
                                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                                    {l.userName || l.userId?.slice(0, 8) || 'unknown'}{ctx ? ` · ${ctx}` : ''}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,23,42,0.06)', borderRadius: '12px', padding: '14px', marginTop: '18px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '0.95rem' }}>Members</h3>
                      {oversightDetail.members.length === 0 ? (
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No members yet.</div>
                      ) : (
                        <table style={styles.vaultTable}>
                          <thead>
                            <tr>
                              <th style={styles.vaultTh}>Name</th>
                              <th style={styles.vaultTh}>Email</th>
                              <th style={styles.vaultTh}>Role</th>
                              <th style={styles.vaultTh}>Dept role</th>
                              <th style={styles.vaultTh}>Permissions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {oversightDetail.members.map((m: any) => (
                              <tr key={m.userId} style={styles.vaultTr}>
                                <td style={styles.vaultTd}>{m.user?.name || m.userId}{m.isPrimary && <span style={{ marginLeft: '6px', color: '#00A651', fontSize: '0.65rem' }}>★ primary</span>}</td>
                                <td style={styles.vaultTd}>{m.user?.email || '—'}</td>
                                <td style={styles.vaultTd}><span style={styles.badge}>{m.user?.role || '—'}</span></td>
                                <td style={styles.vaultTd}>{m.role}</td>
                                <td style={{ ...styles.vaultTd, fontSize: '0.7rem', color: '#64748b' }}>
                                  {m.user?.role === 'ADMIN'
                                    ? <span style={{ color: '#fbbf24' }}>ALL (global ADMIN)</span>
                                    : (m.permissions || 'VIEW')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={styles.previewLoading}><p>No data available for this department.</p></div>
                )
              )}
            </div>
          ) : (
            <div style={styles.emptyState}>Unknown Tab Context</div>
          )}
        </div>

        {activeTab === 'DOCS' && (
          <div style={styles.previewArea}>
            {selectedDocId ? (
              <div style={styles.previewWrapper}>
                <div style={styles.previewHeader}>
                  <span style={styles.previewDocTitle}>{documents.find(d => d.id === selectedDocId)?.name}</span>
                  <button style={styles.closePreview} onClick={() => setSelectedDocId(null)}>×</button>
                </div>
                {isPreviewLoading ? (
                  <div style={styles.previewLoading}>
                    <div style={styles.spinner}></div>
                    <p>Preparing secure view...</p>
                  </div>
                ) : previewUrl ? (
                  <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    <iframe
                      src={previewUrl}
                      style={styles.iframe}
                      title="Document Preview"
                    />
                    {tenantSettings.watermarkingEnabled && (
                      <div style={styles.watermarkOverlay}>
                        {Array(20).fill(`MULTICHOICE - ${currentUser?.name || 'UNKNOWN'}`).map((text, i) => (
                          <div key={i} style={styles.watermarkText}>{text}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div style={styles.previewEmptyState}>
                <div style={styles.emptyIcon}>
                  <svg width="64" height="64" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <p>Select a document to view its contents</p>
              </div>
            )}
          </div>
        )}

        {showLogsFor && (
          <div style={styles.logsOverlay} onClick={() => setShowLogsFor(null)}>
            <div style={styles.logsContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Activity History</h3>
                <button style={styles.closeLogs} onClick={() => setShowLogsFor(null)}>×</button>
              </div>
              <div style={styles.logsList}>
                {activeLogs.length > 0 ? activeLogs.map(log => (
                  <div key={log.id} style={styles.logItem}>
                    <span style={styles.logAction}>{log.action}</span>
                    <span style={styles.logTime}>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                )) : (
                  <p style={styles.noLogs}>No activity recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {isSwitchingDept && (
          <div style={styles.switchingOverlay}>
            <div style={styles.spinner}></div>
            <p style={{ color: '#fff', marginTop: '1rem', fontWeight: '600' }}>Switching context...</p>
          </div>
        )}

        {selectedAuditLog && (
          <div style={styles.logsOverlay} onClick={() => setSelectedAuditLog(null)}>
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ ...styles.shareContent, maxWidth: '560px' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Audit Event Details</h3>
                <button style={styles.closeLogs} onClick={() => setSelectedAuditLog(null)}>×</button>
              </div>
              <div style={styles.modalBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Action</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedAuditLog.action}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Timestamp</div>
                    <div style={{ fontWeight: 600 }}>{new Date(selectedAuditLog.timestamp).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>User</div>
                    <div style={{ fontWeight: 600 }}>{selectedAuditLog.userName || selectedAuditLog.userId || 'Unknown'}</div>
                    {selectedAuditLog.userEmail && <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{selectedAuditLog.userEmail}</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Department</div>
                    <div style={{ fontWeight: 600 }}>{deptNameById(selectedAuditLog.departmentId)}</div>
                  </div>
                  {selectedAuditLog.ip && (
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>IP Address</div>
                      <div>{selectedAuditLog.ip}</div>
                    </div>
                  )}
                  {selectedAuditLog.userAgent && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>User Agent</div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', wordBreak: 'break-word' }}>{selectedAuditLog.userAgent}</div>
                    </div>
                  )}
                </div>
                {selectedAuditLog.metadata && (
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Metadata</div>
                    <pre style={{
                      margin: 0,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15,23,42,0.04)',
                      border: '1px solid rgba(15,23,42,0.08)',
                      fontSize: '0.72rem',
                      overflowX: 'auto',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {typeof parseAuditMetadata(selectedAuditLog.metadata) === 'object'
                        ? JSON.stringify(parseAuditMetadata(selectedAuditLog.metadata), null, 2)
                        : String(selectedAuditLog.metadata)}
                    </pre>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                  {selectedAuditLog.departmentId && (
                    <button
                      style={{ ...styles.newFolderBtn, background: 'transparent' }}
                      onClick={() => {
                        const deptId = selectedAuditLog.departmentId;
                        setSelectedAuditLog(null);
                        openDashboardDeptDetail(deptId);
                      }}
                    >
                      Open department
                    </button>
                  )}
                  <button style={styles.newFolderBtn} onClick={() => setSelectedAuditLog(null)}>Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {isDashboardDeptModalOpen && (
          <div style={styles.logsOverlay} onClick={() => { setIsDashboardDeptModalOpen(false); setDashboardDeptModalView('list'); }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ ...styles.shareContent, maxWidth: dashboardDeptModalView === 'detail' ? '920px' : '640px', width: '95vw' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>
                  {dashboardDeptModalView === 'detail'
                    ? `Department: ${dashboardDeptDetail?.department?.name || 'Details'}`
                    : 'All Departments'}
                </h3>
                <button
                  style={styles.closeLogs}
                  onClick={() => { setIsDashboardDeptModalOpen(false); setDashboardDeptModalView('list'); }}
                >
                  ×
                </button>
              </div>
              <div style={styles.modalBody}>
                {dashboardDeptModalView === 'list' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                    {(dashboardData?.departmentSnapshot || []).map((d: any) => (
                      <button
                        key={d.id}
                        onClick={() => openDashboardDeptDetail(d.id)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid rgba(15,23,42,0.08)',
                          background: 'rgba(255,255,255,0.8)',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{d.name}</span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {d.documents} docs · {d.users} users · {d.folders} folders
                        </span>
                      </button>
                    ))}
                  </div>
                ) : isDashboardDeptDetailLoading ? (
                  <div style={styles.previewLoading}><p>Loading department details…</p></div>
                ) : dashboardDeptDetail ? (
                  <>
                    <button
                      style={{ ...styles.newFolderBtn, background: 'transparent', marginBottom: '12px' }}
                      onClick={() => setDashboardDeptModalView('list')}
                    >
                      ← Back to all departments
                    </button>
                    <div style={styles.reportGrid}>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Documents</span>
                        <span style={styles.kpiValue}>{dashboardDeptDetail.documents.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Folders</span>
                        <span style={styles.kpiValue}>{dashboardDeptDetail.folders.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>Members</span>
                        <span style={styles.kpiValue}>{dashboardDeptDetail.members.length}</span>
                      </div>
                      <div style={styles.kpiCard}>
                        <span style={styles.kpiLabel}>High-risk · 7d</span>
                        <span style={{ ...styles.kpiValue, color: dashboardDeptDetail.highRisk7d > 0 ? '#DC2626' : '#10b981' }}>
                          {dashboardDeptDetail.highRisk7d}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: '14px', maxHeight: '280px', overflowY: 'auto' }}>
                      <h4 style={{ ...styles.settingsTitle, marginTop: 0 }}>Recent activity</h4>
                      {dashboardDeptDetail.activity.slice(0, 12).map((l: any) => (
                        <div
                          key={l.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setIsDashboardDeptModalOpen(false);
                            setSelectedAuditLog(l);
                          }}
                          style={{
                            padding: '8px 10px',
                            marginBottom: '6px',
                            borderRadius: '8px',
                            border: '1px solid rgba(15,23,42,0.08)',
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.7)'
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>{l.action}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                            {l.userName || l.userId} · {new Date(l.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={styles.previewLoading}><p>Unable to load department details.</p></div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {isAdminPwdModalOpen && (
          <div style={styles.logsOverlay} onClick={() => { if (!adminPwdSubmitting) setIsAdminPwdModalOpen(false); }}>
            <div style={styles.shareContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Reset Password: {selectedUserForPassword?.name}</h3>
                <button style={styles.closeLogs} onClick={() => { if (!adminPwdSubmitting) setIsAdminPwdModalOpen(false); }}>×</button>
              </div>
              <div style={styles.modalBody}>
                <p style={styles.modalSubtext}>
                  Set a new password for this user. Their current sessions will be signed out immediately.
                </p>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <input
                    type={adminPwdVisible ? 'text' : 'password'}
                    style={{ ...styles.modalInput, width: '100%', paddingRight: '40px' }}
                    placeholder="New password (min. 8 chars)"
                    value={adminPwdNew}
                    onChange={e => setAdminPwdNew(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setAdminPwdVisible(v => !v)}
                    title={adminPwdVisible ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    {adminPwdVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={adminPwdVisible ? 'text' : 'password'}
                  style={{ ...styles.modalInput, width: '100%', marginBottom: '12px' }}
                  placeholder="Confirm new password"
                  value={adminPwdConfirm}
                  onChange={e => setAdminPwdConfirm(e.target.value)}
                  autoComplete="new-password"
                  onKeyDown={e => { if (e.key === 'Enter') submitAdminPasswordReset(); }}
                />
                {adminPwdError && (
                  <div style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '10px' }}>{adminPwdError}</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    style={{ ...styles.newFolderBtn, background: 'transparent' }}
                    onClick={() => setIsAdminPwdModalOpen(false)}
                    disabled={adminPwdSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ ...styles.newFolderBtn, opacity: adminPwdSubmitting ? 0.6 : 1 }}
                    onClick={submitAdminPasswordReset}
                    disabled={adminPwdSubmitting}
                  >
                    {adminPwdSubmitting ? 'Updating…' : 'Reset Password'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAssignmentPanelOpen && (
          <div style={styles.logsOverlay} onClick={() => setIsAssignmentPanelOpen(false)}>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              style={styles.assignmentPanel}
              onClick={e => e.stopPropagation()}
            >
              <div style={styles.assignmentHeader}>
                <h3 style={styles.logsTitle}>Manage Access: {selectedUserForAssignment?.name}</h3>
                <button style={styles.closeLogs} onClick={() => setIsAssignmentPanelOpen(false)}>×</button>
              </div>
              
              <div style={styles.assignmentBody}>
                <p style={styles.modalSubtext}>Assign departments and define roles for this user.</p>
                {selectedUserForAssignment?.role === 'ADMIN' && (
                  <div style={{
                    marginBottom: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(251, 191, 36, 0.08)',
                    border: '1px solid rgba(251, 191, 36, 0.25)'
                  }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
                      Global ADMIN — All Rights
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#fde68a', marginBottom: '4px' }}>
                      {ALL_PERMS.join(' · ')}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                      Department-level permissions below are stored for record only; ADMIN users bypass them at runtime.
                    </div>
                  </div>
                )}
                
                <div style={styles.assignmentList}>
                  {availableDepts.map(dept => {
                    const assignment = userAssignments.find(a => a.departmentId === dept.id);
                    const isAssigned = !!assignment;
                    
                    const isManaged = currentUser?.role === 'ADMIN' || 
                      currentUser?.departments?.some((ud: any) => ud.departmentId === dept.id && ud.role === 'HOD');

                    return (
                      <div key={dept.id} style={{
                        ...styles.assignmentItem,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        borderColor: isAssigned ? '#00A651' : '#e5e7eb',
                        background: isAssigned ? 'rgba(0, 166, 81, 0.05)' : 'transparent',
                        opacity: isManaged ? 1 : 0.5,
                        pointerEvents: isManaged ? 'all' : 'none'
                      }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <input 
                            type="checkbox" 
                            checked={isAssigned}
                            disabled={!isManaged}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserAssignments([...userAssignments, { 
                                  departmentId: dept.id, 
                                  role: 'MEMBER', 
                                  isPrimary: userAssignments.length === 0, 
                                  department: dept,
                                  permissionsList: permsForRole('MEMBER')
                                }]);
                              } else {
                                setUserAssignments(userAssignments.filter(a => a.departmentId !== dept.id));
                              }
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '600', color: isAssigned ? '#0f172a' : '#64748b' }}>{dept.name}</span>
                            {!isManaged && <span style={{ fontSize: '0.6rem', color: '#DC2626' }}>Managed by other HOD</span>}
                          </div>
                        </div>

                        {isAssigned && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <select 
                              style={styles.roleSelect}
                              value={assignment.role}
                              disabled={!isManaged}
                              onChange={(e) => {
                                const newRole = e.target.value as 'MEMBER' | 'HOD';
                                setUserAssignments(userAssignments.map(a => a.departmentId === dept.id ? { ...a, role: newRole, permissionsList: permsForRole(newRole) } : a));
                              }}
                            >
                              <option value="MEMBER">Member</option>
                              <option value="HOD">HOD</option>
                            </select>
                            
                            <button 
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: isManaged ? 'pointer' : 'default',
                                color: assignment.isPrimary ? '#fbbf24' : '#4b5563',
                                fontSize: '1.2rem',
                                opacity: isManaged ? 1 : 0.3
                              }}
                              disabled={!isManaged}
                              onClick={() => {
                                setUserAssignments(userAssignments.map(a => ({
                                  ...a,
                                  isPrimary: a.departmentId === dept.id
                                })));
                              }}
                              title={assignment.isPrimary ? 'Primary Department' : 'Set as Primary'}
                            >
                              ★
                            </button>
                          </div>
                        )}
                       </div>
                        {isAssigned && (
                          <div style={{ marginTop: '10px', paddingLeft: '24px' }}>
                            {(() => {
                              const currentPerms: string[] = Array.isArray(assignment.permissionsList)
                                ? assignment.permissionsList
                                : (assignment.permissions ? String(assignment.permissions).split(',').map((p: string) => p.trim()).filter(Boolean) : []);
                              const matched = matchPermissionPreset(currentPerms);
                              return (
                                <>
                                  <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>Permission set</span>
                                    <span style={{ fontSize: '0.6rem', color: matched ? '#00A651' : '#94a3b8', textTransform: 'none', letterSpacing: 0 }}>
                                      {matched ? matched.label : 'Custom'}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                    {PERMISSION_PRESETS.map((preset: PermissionPreset) => {
                                      const active = matched?.id === preset.id;
                                      return (
                                        <button
                                          key={preset.id}
                                          type="button"
                                          title={preset.description}
                                          disabled={!isManaged}
                                          onClick={() => {
                                            setUserAssignments(userAssignments.map((a: any) =>
                                              a.departmentId === dept.id
                                                ? { ...a, permissionsList: [...preset.permissions] }
                                                : a
                                            ));
                                          }}
                                          style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            border: `1px solid ${active ? '#00A651' : 'rgba(15,23,42,0.12)'}`,
                                            background: active ? 'rgba(0, 166, 81, 0.10)' : '#ffffff',
                                            color: active ? '#00A651' : '#475569',
                                            cursor: isManaged ? 'pointer' : 'not-allowed',
                                            opacity: isManaged ? 1 : 0.6
                                          }}
                                        >
                                          {preset.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}
                            <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                              Fine-tune
                            </div>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                              gap: '6px 14px'
                            }}>
                              {ALL_PERMS.map(perm => {
                                const current: string[] = Array.isArray(assignment.permissionsList)
                                  ? assignment.permissionsList
                                  : (assignment.permissions ? String(assignment.permissions).split(',').map((p: string) => p.trim()).filter(Boolean) : []);
                                const active = current.includes(perm);
                                const isView = perm === 'VIEW';
                                const inputId = `manage-${dept.id}-${perm}`;
                                return (
                                  <label
                                    key={perm}
                                    htmlFor={inputId}
                                    title={isView ? 'VIEW is always granted' : ''}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      fontSize: '0.75rem',
                                      color: active ? '#1e293b' : '#64748b',
                                      cursor: (!isManaged || isView) ? 'default' : 'pointer',
                                      opacity: isView ? 0.85 : 1
                                    }}
                                  >
                                    <input
                                      id={inputId}
                                      type="checkbox"
                                      checked={active}
                                      disabled={!isManaged || isView}
                                      onChange={() => {
                                        if (isView) return;
                                        setUserAssignments(userAssignments.map(a => {
                                          if (a.departmentId !== dept.id) return a;
                                          const list: string[] = Array.isArray(a.permissionsList)
                                            ? [...a.permissionsList]
                                            : (a.permissions ? String(a.permissions).split(',').map((p: string) => p.trim()).filter(Boolean) : []);
                                          const idx = list.indexOf(perm);
                                          if (idx >= 0) list.splice(idx, 1); else list.push(perm);
                                          if (!list.includes('VIEW')) list.unshift('VIEW');
                                          return { ...a, permissionsList: list };
                                        }));
                                      }}
                                      style={{ accentColor: '#00A651' }}
                                    />
                                    <span>{PERMISSION_LABELS[perm as PermissionCode] || perm}</span>
                                    {isView && (
                                      <span style={{ fontSize: '0.6rem', color: '#64748b' }}>(required)</span>
                                    )}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={styles.assignmentFooter}>
                <button 
                  style={{ ...styles.addShareBtn, width: '100%', opacity: isAssignmentLoading ? 0.6 : 1 }}
                  onClick={saveAssignments}
                  disabled={isAssignmentLoading}
                >
                  {isAssignmentLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isFolderModalOpen && (
          <div style={styles.logsOverlay} onClick={() => { if (!isCreatingFolder) setIsFolderModalOpen(false); }}>
            <div style={styles.shareContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>{currentFolderId ? 'New sub-folder' : 'New folder'}</h3>
                <button style={styles.closeLogs} onClick={() => { if (!isCreatingFolder) setIsFolderModalOpen(false); }}>×</button>
              </div>
              <div style={styles.modalBody}>
                <p style={styles.modalSubtext}>
                  Creating inside: <strong>{currentFolderId ? (folders.find((f: any) => f.id === currentFolderId)?.name || 'folder') : 'Home (department root)'}</strong>
                </p>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Folder name
                </label>
                <input
                  type="text"
                  style={{ ...styles.modalInput, width: '100%', marginBottom: '12px' }}
                  value={newFolderName}
                  onChange={e => { setNewFolderName(e.target.value); if (folderError) setFolderError(null); }}
                  onKeyDown={e => { if (e.key === 'Enter') submitFolder(); }}
                  autoFocus
                />
                {folderError && (
                  <div style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '10px' }}>{folderError}</div>
                )}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setIsFolderModalOpen(false)}
                    disabled={isCreatingFolder}
                    style={{
                      background: 'transparent',
                      color: '#64748b',
                      border: '1px solid rgba(15,23,42,0.08)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      cursor: isCreatingFolder ? 'wait' : 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitFolder}
                    disabled={isCreatingFolder}
                    style={{ ...styles.addShareBtn, opacity: isCreatingFolder ? 0.6 : 1 }}
                  >
                    {isCreatingFolder ? 'Creating…' : 'Create folder'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUploadModalOpen && (() => {
          // Show only departments where the current user can upload.
          const isAdmin = currentUser?.role === 'ADMIN';
          const uploadableDepts: Array<{ id: string; name: string }> = isAdmin
            ? availableDepts
            : (currentUser?.departments || [])
                .filter((d: any) => {
                  const perms: string[] = Array.isArray(d.permissionsList)
                    ? d.permissionsList
                    : String(d.permissions || '').split(',').map((p: string) => p.trim()).filter(Boolean);
                  return perms.includes('UPLOAD');
                })
                .map((d: any) => ({ id: d.departmentId, name: d.department?.name || d.departmentId }));

          return (
            <div style={styles.logsOverlay} onClick={() => { if (!isUploading) setIsUploadModalOpen(false); }}>
              <div
                style={{
                  ...styles.shareContent,
                  width: 'min(640px, 92vw)',
                  maxWidth: '640px',
                  maxHeight: '90vh',
                  padding: 0,
                  overflow: 'hidden'
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ ...styles.logsHeader, padding: '20px 24px 12px', flexShrink: 0 }}>
                  <h3 style={styles.logsTitle}>Upload document</h3>
                  <button style={styles.closeLogs} onClick={() => { if (!isUploading) setIsUploadModalOpen(false); }}>×</button>
                </div>

                <div
                  style={{
                    ...styles.modalBody,
                    padding: '4px 24px 16px',
                    gap: '14px',
                    overflowY: 'auto',
                    flex: 1,
                    minHeight: 0
                  }}
                >
                  {/* File picker / preview */}
                  <div
                    style={{
                      border: '1px dashed rgba(15,23,42,0.15)',
                      borderRadius: '10px',
                      padding: '14px',
                      marginBottom: '14px',
                      background: 'rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      background: 'rgba(0,166,81,0.15)', color: '#00A651',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {uploadFile ? (
                        <>
                          <div style={{ color: '#1e293b', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {uploadFile.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            {(uploadFile.size / 1024).toFixed(1)} KB · {uploadFile.type || 'unknown type'}
                          </div>
                        </>
                      ) : (
                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>No file selected.</div>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'rgba(0,166,81,0.15)',
                        color: '#00A651',
                        border: '1px solid rgba(0,166,81,0.3)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {uploadFile ? 'Change' : 'Browse'}
                    </button>
                  </div>

                  {/* Live preview */}
                  {uploadFile && (() => {
                    const mime = uploadFile.type || '';
                    const ext = uploadFile.name.toLowerCase().split('.').pop() || '';
                    const isImage = mime.startsWith('image/');
                    const isPdf = mime === 'application/pdf' || ext === 'pdf';
                    const isText = !!uploadTextPreview;

                    const wrapper: React.CSSProperties = {
                      border: '1px solid rgba(15,23,42,0.08)',
                      borderRadius: '10px',
                      background: '#f8fafc',
                      marginBottom: '14px',
                      overflow: 'hidden',
                      maxHeight: '320px',
                      display: 'flex',
                      alignItems: 'stretch',
                      justifyContent: 'center'
                    };

                    if (isImage && uploadPreviewUrl) {
                      return (
                        <div style={wrapper}>
                          <img
                            src={uploadPreviewUrl}
                            alt={uploadFile.name}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '320px',
                              objectFit: 'contain',
                              display: 'block',
                              margin: 'auto'
                            }}
                          />
                        </div>
                      );
                    }

                    if (isPdf && uploadPreviewUrl) {
                      // Append PDF viewer params to hide the browser's built-in
                      // toolbar (download/print/overflow) and fit-to-width.
                      // Avoids users downloading the file before it's uploaded
                      // and makes the preview look native to our modal.
                      const cleanSrc = `${uploadPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
                      return (
                        <div style={{ ...wrapper, height: '300px', maxHeight: '300px', display: 'block' }}>
                          <iframe
                            src={cleanSrc}
                            title={uploadFile.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                              display: 'block',
                              background: '#ffffff'
                            }}
                          />
                        </div>
                      );
                    }

                    if (isText) {
                      return (
                        <div style={{ ...wrapper, display: 'block', maxHeight: '260px' }}>
                          <pre style={{
                            margin: 0,
                            padding: '12px 14px',
                            fontSize: '0.75rem',
                            lineHeight: 1.45,
                            color: '#0f172a',
                            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight: '260px',
                            overflow: 'auto',
                            background: '#ffffff'
                          }}>
                            {uploadTextPreview}
                          </pre>
                          {uploadTextTruncated && (
                            <div style={{
                              padding: '6px 14px',
                              fontSize: '0.7rem',
                              color: '#64748b',
                              borderTop: '1px solid rgba(15,23,42,0.06)',
                              background: '#f8fafc'
                            }}>
                              Showing the first 4 KB. The full file ({(uploadFile.size / 1024).toFixed(1)} KB) will be uploaded.
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div
                        style={{
                          ...wrapper,
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '24px',
                          color: '#64748b',
                          fontSize: '0.8rem',
                          textAlign: 'center'
                        }}
                      >
                        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" style={{ opacity: 0.75 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>Preview not available</div>
                          <div>{(mime || ext || 'unknown').toUpperCase()} files can&rsquo;t be previewed inline.</div>
                          <div style={{ marginTop: '4px' }}>The file will still upload normally.</div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Title */}
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    style={{ ...styles.modalInput, width: '100%', marginBottom: '14px' }}
                  />

                  {/* Date */}
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Upload date
                  </label>
                  <input
                    type="date"
                    value={uploadDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={e => setUploadDate(e.target.value)}
                    style={{ ...styles.modalInput, width: '200px', marginBottom: '14px' }}
                  />

                  {/* Department */}
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Allocate to department
                  </label>
                  <select
                    value={uploadDeptId}
                    onChange={e => {
                      const dept = e.target.value;
                      setUploadDeptId(dept);
                      // Reset the chosen folder if it doesn't belong to the newly selected department.
                      const folder = folders.find((f: any) => f.id === uploadFolderId);
                      if (!folder || folder.departmentId !== dept) setUploadFolderId('');
                    }}
                    style={{ ...styles.modalInput, width: '100%', marginBottom: '14px' }}
                  >
                    <option value="">Select department…</option>
                    {uploadableDepts.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>

                  {/* Folder (within the chosen department) */}
                  {(() => {
                    const folderOptions = uploadDeptId
                      ? folders.filter((f: any) => f.departmentId === uploadDeptId)
                      : [];
                    return (
                      <>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Folder
                        </label>
                        <select
                          value={uploadFolderId}
                          onChange={e => setUploadFolderId(e.target.value)}
                          disabled={!uploadDeptId}
                          style={{ ...styles.modalInput, width: '100%', marginBottom: '14px', opacity: uploadDeptId ? 1 : 0.6 }}
                        >
                          <option value="">{uploadDeptId ? 'Department root (no folder)' : 'Select a department first…'}</option>
                          {folderOptions.map((f: any) => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                          ))}
                        </select>
                        {uploadDeptId && folderOptions.length === 0 && (
                          <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '10px', marginTop: '-6px' }}>
                            This department has no folders yet — the document will be placed at its root.
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {uploadError && (
                    <div style={{ color: '#DC2626', fontSize: '0.8rem' }}>{uploadError}</div>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    padding: '14px 24px',
                    borderTop: '1px solid rgba(15,23,42,0.08)',
                    background: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    disabled={isUploading}
                    style={{
                      background: 'transparent',
                      color: '#64748b',
                      border: '1px solid rgba(15,23,42,0.08)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      cursor: isUploading ? 'wait' : 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitUpload}
                    disabled={isUploading}
                    style={{ ...styles.addShareBtn, opacity: isUploading ? 0.6 : 1 }}
                  >
                    {isUploading ? 'Uploading…' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {isChangePasswordOpen && (
          <div style={styles.logsOverlay} onClick={() => setIsChangePasswordOpen(false)}>
            <div style={styles.shareContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Change password</h3>
                <button style={styles.closeLogs} onClick={() => setIsChangePasswordOpen(false)}>×</button>
              </div>
              <div style={styles.modalBody}>
                <p style={styles.modalSubtext}>
                  Changing your password will sign you out of every other device. Your current session stays active.
                </p>
                <input
                  type="password"
                  style={{ ...styles.modalInput, width: '100%', marginBottom: '10px' }}
                  placeholder="Current password"
                  value={pwdCurrent}
                  onChange={e => setPwdCurrent(e.target.value)}
                  autoFocus
                />
                <input
                  type="password"
                  style={{ ...styles.modalInput, width: '100%', marginBottom: '10px' }}
                  placeholder="New password (min. 8 chars)"
                  value={pwdNew}
                  onChange={e => setPwdNew(e.target.value)}
                />
                <input
                  type="password"
                  style={{ ...styles.modalInput, width: '100%', marginBottom: '12px' }}
                  placeholder="Confirm new password"
                  value={pwdConfirm}
                  onChange={e => setPwdConfirm(e.target.value)}
                />
                {pwdError && (
                  <div style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '10px' }}>{pwdError}</div>
                )}
                <button
                  style={{ ...styles.addShareBtn, opacity: pwdSubmitting ? 0.6 : 1 }}
                  onClick={submitPasswordChange}
                  disabled={pwdSubmitting}
                >
                  {pwdSubmitting ? 'Updating…' : 'Update password'}
                </button>
              </div>
            </div>
          </div>
        )}

        {folderShareModalOpen && folderShareTarget && (
          <div style={styles.logsOverlay} onClick={() => setFolderShareModalOpen(false)}>
            <div style={styles.shareContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Share Folder: {folderShareTarget.name}</h3>
                <button style={styles.closeLogs} onClick={() => setFolderShareModalOpen(false)}>×</button>
              </div>

              <div style={styles.modalBody}>
                <p style={styles.modalSubtext}>
                  Grant a specific user access to this folder and its documents. They&apos;ll see it under <strong>Shared With Me</strong>, even if they aren&apos;t a member of the {folderShareTarget.department?.name || 'owning'} department.
                </p>

                <div style={styles.shareInputGroup}>
                  <select
                    style={{ ...styles.modalInput, flex: 1 }}
                    value={folderShareUserId}
                    onChange={e => setFolderShareUserId(e.target.value)}
                  >
                    <option value="">Select user…</option>
                    {users.filter((u: any) => u.id !== currentUser?.id).map((u: any) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.role}) — {u.email}
                      </option>
                    ))}
                  </select>
                  <select
                    style={styles.permissionSelect}
                    value={folderSharePermLevel}
                    onChange={e => setFolderSharePermLevel(e.target.value as 'VIEW' | 'EDIT')}
                  >
                    <option value="VIEW">View Only</option>
                    <option value="EDIT">Can Edit</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Expires on:</label>
                  <input
                    type="date"
                    style={{ ...styles.modalInput, width: '170px' }}
                    value={folderShareExpiryDate}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    onChange={e => setFolderShareExpiryDate(e.target.value)}
                  />
                  {folderShareExpiryDate ? (
                    <button
                      onClick={() => setFolderShareExpiryDate('')}
                      style={{
                        background: 'transparent',
                        color: '#DC2626',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      Clear (no expiry)
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontStyle: 'italic' }}>Leave empty for no expiry</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '0.7rem', color: '#64748b' }}>
                  <span>Quick set:</span>
                  {[
                    { label: 'Tomorrow', days: 1 },
                    { label: '7 days', days: 7 },
                    { label: '30 days', days: 30 }
                  ].map(({ label, days }) => (
                    <button
                      key={label}
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + days);
                        setFolderShareExpiryDate(d.toISOString().split('T')[0]);
                      }}
                      style={{
                        background: 'rgba(0, 166, 81, 0.1)',
                        color: '#00A651',
                        border: '1px solid rgba(0, 166, 81, 0.25)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      {label}
                    </button>
                  ))}
                  {folderShareExpiryDate && (
                    <span style={{ marginLeft: 'auto', color: '#f59e0b' }}>
                      Expires end of {new Date(folderShareExpiryDate + 'T23:59:59').toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>

                {folderShareError && (
                  <div style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '10px' }}>{folderShareError}</div>
                )}

                <button
                  style={{ ...styles.addShareBtn, opacity: folderShareLoading ? 0.6 : 1 }}
                  onClick={submitFolderShare}
                  disabled={folderShareLoading}
                >
                  {folderShareLoading ? 'Sharing…' : 'Grant Access'}
                </button>

                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Current collaborators ({folderShareGrants.length})
                  </div>
                  {folderShareGrants.length === 0 ? (
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No external users have access yet.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {folderShareGrants.map((g: any) => (
                        <div key={g.id || g.sharedWithUserId} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontSize: '0.8rem', color: '#1e293b', fontWeight: 600 }}>
                              {g.user?.name || g.sharedWithUserId}
                            </span>
                            {g.user?.email && (
                              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{g.user.email}</span>
                            )}
                          </div>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: g.permissionLevel === 'EDIT' ? '#fbbf24' : '#00A651',
                            background: g.permissionLevel === 'EDIT' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(0, 166, 81, 0.1)',
                            padding: '3px 8px',
                            borderRadius: '999px'
                          }}>
                            {g.permissionLevel}
                          </span>
                          {g.expiresAt && (
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }} title={`Expires ${new Date(g.expiresAt).toLocaleString()}`}>
                              exp {new Date(g.expiresAt).toLocaleDateString()}
                            </span>
                          )}
                          <button
                            onClick={() => revokeFolderShare(g.sharedWithUserId)}
                            style={{
                              background: 'transparent',
                              color: '#DC2626',
                              border: '1px solid rgba(220, 38, 38, 0.3)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.65rem',
                              fontWeight: 600
                            }}
                          >
                            Revoke
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isShareModalOpen && (
          <div style={styles.logsOverlay} onClick={() => setIsShareModalOpen(false)}>
            <div style={styles.shareContent} onClick={e => e.stopPropagation()}>
              <div style={styles.logsHeader}>
                <h3 style={styles.logsTitle}>Share Document</h3>
                <button style={styles.closeLogs} onClick={() => setIsShareModalOpen(false)}>×</button>
              </div>
              
              <div style={styles.modalBody}>
                <div style={styles.shareInputGroup}>
                  <input 
                    style={{ ...styles.modalInput, flex: 1 }}
                    placeholder="User ID (e.g., colleague_456)"
                    value={shareUserId}
                    onChange={e => setShareUserId(e.target.value)}
                    autoFocus
                  />
                  <select 
                    style={styles.permissionSelect}
                    value={permissionLevel}
                    onChange={e => setPermissionLevel(e.target.value as 'VIEW' | 'EDIT')}
                  >
                    <option value="VIEW">View Only</option>
                    <option value="EDIT">Can Edit</option>
                  </select>
                  <input
                    type="date"
                    style={{ ...styles.permissionSelect, minWidth: '150px' }}
                    value={shareExpiryDate}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    onChange={e => setShareExpiryDate(e.target.value)}
                    title="Pick an expiry date (end of day)"
                  />
                  <button style={styles.addShareBtn} onClick={handleShare}>
                    Add
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '0.7rem', color: '#64748b' }}>
                  <span>Quick set:</span>
                  {[
                    { label: 'Tomorrow', days: 1 },
                    { label: '7 days', days: 7 },
                    { label: '30 days', days: 30 }
                  ].map(({ label, days }) => (
                    <button
                      key={label}
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + days);
                        setShareExpiryDate(d.toISOString().split('T')[0]);
                      }}
                      style={{
                        background: 'rgba(0, 166, 81, 0.1)',
                        color: '#00A651',
                        border: '1px solid rgba(0, 166, 81, 0.25)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      {label}
                    </button>
                  ))}
                  {shareExpiryDate && (
                    <button
                      onClick={() => setShareExpiryDate('')}
                      style={{
                        background: 'transparent',
                        color: '#DC2626',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      Clear (no expiry)
                    </button>
                  )}
                  {shareExpiryDate && (
                    <span style={{ marginLeft: 'auto', color: '#f59e0b' }}>
                      Expires end of {new Date(shareExpiryDate + 'T23:59:59').toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>

                <div style={styles.collabSection}>
                  <h4 style={styles.collabTitle}>People with access</h4>
                  <div style={styles.collabList}>
                    {isShareLoading ? (
                      <div style={styles.collabLoading}>Loading...</div>
                    ) : collaborators.length > 0 ? (
                      collaborators.map(c => (
                        <div key={c.id} style={styles.collabItem}>
                          <div style={styles.collabInfo}>
                            <div style={styles.collabAvatar}>{c.sharedWithUserId[0].toUpperCase()}</div>
                            <div style={styles.collabText}>
                              <span style={styles.collabId}>{c.sharedWithUserId}</span>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={styles.collabPerm}>{c.permissionLevel}</span>
                                {c.expiresAt && (
                                  <span style={{ fontSize: '0.7rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Expires {new Date(c.expiresAt).toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button 
                            style={styles.removeCollabBtn} 
                            onClick={() => handleRemoveCollaborator(c.sharedWithUserId)}
                            title="Remove Access"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p style={styles.noCollabs}>Not shared with anyone yet.</p>
                    )}
                  </div>
                </div>

                <div style={styles.shareFooter}>
                  <button style={styles.copyLinkBtn} onClick={() => sharingDocId && handleCopyLink(sharingDocId)}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    background: '#fafafa',
  },
  contentColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  },
  sideNav: {
    width: '240px',
    flexShrink: 0,
    background: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
  },
  sideNavBrand: {
    padding: '20px 18px 16px',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(180deg, rgba(0, 166, 81, 0.04) 0%, rgba(37, 99, 235, 0.04) 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sideNavUser: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '8px 10px',
    background: 'linear-gradient(135deg, rgba(0, 166, 81, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
    border: '1px solid rgba(0, 166, 81, 0.22)',
    borderRadius: '8px',
  },
  sideNavUserName: {
    fontSize: '0.78rem',
    color: '#1e293b',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sideNavUserRole: {
    fontSize: '0.6rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#34D27A',
    fontWeight: 700,
  },
  sideNavLinks: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 10px',
    gap: '4px',
    overflowY: 'auto',
  },
  sideNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '10px 12px',
    borderRadius: '8px',
    borderLeft: '3px solid transparent',
    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  },
  activeSideNavItem: {
    background: 'rgba(0,166,81,0.12)',
    color: '#1e293b',
    borderLeft: '3px solid #00A651',
  },
  sideNavIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    color: 'inherit',
    flexShrink: 0,
  },
  sideNavFooter: {
    padding: '12px',
    borderTop: '1px solid #e5e7eb',
  },
  topBar: {
    height: '64px',
    padding: '0 1.5rem',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 0 0 rgba(0, 166, 81, 0.08), 0 4px 12px -8px rgba(37, 99, 235, 0.10)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    zIndex: 10,
    position: 'relative',
  },
  topBarTitle: {
    fontSize: '0.95rem',
    color: '#1e293b',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  titleAccent: {
    background: 'linear-gradient(135deg, #34D27A 0%, #00A651 50%, #2563EB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: '#00A651',
    fontWeight: '700',
  },
  searchContainer: {
    position: 'relative',
    width: '320px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18px',
    height: '18px',
    color: '#9ca3af',
  },
  searchInput: {
    width: '100%',
    height: '40px',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    paddingLeft: '40px',
    color: '#1e293b',
    fontSize: '0.9rem',
  },
  headerRight: {
    display: 'flex',
    gap: '1rem',
  },
  uploadButton: {
    background: '#00A651',
    color: '#fff',
    padding: '0 1.25rem',
    height: '40px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 6px -1px rgba(0, 166, 81, 0.2)',
    cursor: 'pointer',
  },
  logoutButton: {
    background: 'rgba(220, 38, 38, 0.08)',
    color: '#DC2626',
    border: '1px solid rgba(220, 38, 38, 0.25)',
    padding: '0 1.25rem',
    height: '40px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  sidebar: {
    width: '600px',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
  },
  sidebarHeader: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    fontWeight: '600',
  },
  badge: {
    background: '#ffffff',
    color: '#00A651',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  previewTitle: {
    color: '#1e293b',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  mockAuthWrapper: {
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  mockUserSelect: {
    background: '#ffffff',
    color: '#1e293b',
    border: '1px solid #d1d5db',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
  },
  folderControls: {
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e7eb',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  breadcrumbBtn: {
    color: '#64748b',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    padding: 0,
  },
  breadcrumbSep: {
    color: '#9ca3af',
    fontSize: '0.85rem',
  },
  breadcrumbActive: {
    color: '#1e293b',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  newFolderBtn: {
    background: 'transparent',
    color: '#00A651',
    border: '1px solid rgba(0, 166, 81, 0.5)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  folderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  folderCard: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
    minHeight: '108px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  folderCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '6px',
    width: '100%',
  },
  folderCardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexShrink: 0,
  },
  sharedBadge: {
    background: 'rgba(16, 185, 129, 0.18)',
    color: '#10b981',
    fontSize: '0.55rem',
    padding: '2px 6px',
    borderRadius: '999px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  folderDeptBadge: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    fontSize: '0.6rem',
    color: '#475569',
    background: '#f1f5f9',
    padding: '2px 8px',
    borderRadius: '999px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    letterSpacing: '0.02em',
    marginTop: 'auto',
  },
  folderName: {
    color: '#1e293b',
    fontSize: '0.9rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    lineHeight: 1.3,
  },
  tableContainer: {
    flex: 1,
    overflowY: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
  },
  th: {
    textAlign: 'left',
    padding: '1rem 1.5rem',
    fontSize: '0.7rem',
    color: '#64748b',
    fontWeight: '700',
    borderBottom: '1px solid #e5e7eb',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    borderBottom: '1px solid #ffffff',
  },
  td: {
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    color: '#334155',
    borderBottom: '1px solid #e5e7eb',
  },
  fileCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  fileIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(15, 23, 42, 0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
  nameCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  docName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#0f172a',
  },
  originalName: {
    fontSize: '0.7rem',
    color: '#64748b',
  },
  sourceCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sourceAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#334155',
  },
  sourceDate: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
  labelsList: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  labelPill: {
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'all 0.2s ease',
  },
  filterTray: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0.75rem 1.5rem',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    flexWrap: 'wrap',
  },
  filterTrayLabel: {
    fontSize: '0.7rem',
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  activeChips: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontWeight: '600',
  },
  removeChipBtn: {
    background: 'transparent',
    color: 'inherit',
    fontSize: '1rem',
    lineHeight: '1',
    cursor: 'pointer',
    opacity: 0.6,
    padding: '0 2px',
  },
  clearAllBtn: {
    background: 'transparent',
    color: '#DC2626',
    fontSize: '0.7rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    marginLeft: 'auto',
  },
  noLabels: {
    color: '#d1d5db',
  },
  securityCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerBadge: {
    fontSize: '0.65rem',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionMenu: {
    position: 'relative',
  },
  dotBtn: {
    background: 'transparent',
    color: '#64748b',
    padding: '4px',
    borderRadius: '4px',
  },
  quickActions: {
    position: 'absolute',
    right: '0',
    top: '100%',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '4px',
    zIndex: 100,
    boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08)',
    minWidth: '120px',
  },
  quickBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '0.8rem',
    color: '#334155',
    background: 'transparent',
    borderRadius: '4px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    color: '#0f172a',
    marginBottom: '0.5rem',
  },
  emptySub: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '1.5rem',
  },
  emptyBtn: {
    background: '#00A651',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
  },

  labelSection: {
    padding: '1.5rem',
    borderTop: '1px solid #e5e7eb',
    background: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  labelInputGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  labelInput: {
    flex: 1,
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '0 10px',
    height: '32px',
    color: '#1e293b',
    fontSize: '0.8rem',
  },
  addLabelBtn: {
    background: '#f1f5f9',
    color: '#0f172a',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    fontSize: '1.2rem',
  },
  allLabels: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  selectableLabel: {
    fontSize: '0.75rem',
    background: 'transparent',
    border: '1px solid #d1d5db',
    padding: '4px 10px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  previewArea: {
    flex: 1,
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  previewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1.5rem',
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0 0.5rem',
  },
  previewDocTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0f172a',
  },
  closePreview: {
    background: 'transparent',
    color: '#64748b',
    fontSize: '1.5rem',
    lineHeight: '1',
  },
  iframe: {
    flex: 1,
    width: '100%',
    height: '100%',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.12)',
  },
  previewEmptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    gap: '1rem',
  },
  previewLoading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: '#64748b',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid rgba(0, 166, 81, 0.1)',
    borderTopColor: '#00A651',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyIcon: {
    opacity: 0.5,
  },
  editContainer: {
    display: 'flex',
    gap: '0.5rem',
  },
  editInput: {
    background: '#ffffff',
    border: '1px solid #00A651',
    color: '#0f172a',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    width: '100%',
  },
  saveBtn: {
    background: '#00A651',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  logsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backdropFilter: 'blur(4px)',
  },
  logsContent: {
    background: '#ffffff',
    width: '400px',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
  },
  logsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  logsTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#0f172a',
  },
  closeLogs: {
    background: 'transparent',
    color: '#64748b',
    fontSize: '1.5rem',
  },
  logsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  logItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    background: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  logAction: {
    fontWeight: '600',
    color: '#00A651',
    fontSize: '0.85rem',
  },
  logTime: {
    color: '#64748b',
    fontSize: '0.75rem',
  },
  noLogs: {
    textAlign: 'center',
    color: '#64748b',
    padding: '1rem',
  },
  sidebarTabs: {
    display: 'flex',
    padding: '1rem 1.5rem',
    gap: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  tabBtn: {
    background: 'transparent',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '600',
    padding: '4px 0',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
  },
  activeTab: {
    color: '#00A651',
    borderBottomColor: '#00A651',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
  },
  modalSubtext: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  modalInput: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    color: '#0f172a',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
  },
  shareContent: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    width: '550px',
    borderRadius: '16px',
    border: '1px solid rgba(15, 23, 42, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    padding: '2rem', // Increased padding
  },
  shareInputGroup: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  permissionSelect: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    color: '#0f172a',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    outline: 'none',
  },
  addShareBtn: {
    background: '#00A651',
    color: '#fff',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  collabSection: {
    marginTop: '0.5rem',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1.25rem',
  },
  collabTitle: {
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  collabList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  collabItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(15, 23, 42, 0.03)',
    padding: '10px 12px',
    borderRadius: '10px',
  },
  collabInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  collabAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00A651, #2563EB)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#fff',
  },
  collabText: {
    display: 'flex',
    flexDirection: 'column',
  },
  collabId: {
    fontSize: '0.9rem',
    color: '#0f172a',
    fontWeight: '500',
  },
  collabPerm: {
    fontSize: '0.7rem',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  removeCollabBtn: {
    background: 'transparent',
    color: '#64748b',
    fontSize: '1.25rem',
    padding: '4px 8px',
    borderRadius: '6px',
    lineHeight: '1',
  },
  shareFooter: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  copyLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 166, 81, 0.1)',
    color: '#00A651',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: '1px solid rgba(0, 166, 81, 0.2)',
  },
  collabLoading: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.85rem',
    padding: '1rem',
  },
  noCollabs: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.85rem',
    padding: '1rem',
  },
  localSearchWrapper: {
    padding: '0 1.5rem 1rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  localSearchContainer: {
    position: 'relative',
    width: '100%',
  },
  localSearchInput: {
    width: '100%',
    height: '36px',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    paddingLeft: '36px',
    color: '#1e293b',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  highlight: {
    background: 'rgba(0, 166, 81, 0.18)',
    color: '#0f172a',
    padding: '0 2px',
    borderRadius: '2px',
    fontWeight: '700',
  },
  mainNav: {
    display: 'flex',
    gap: '24px',
    marginLeft: '40px',
  },
  navItem: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '8px 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  activeNavItem: {
    color: '#1e293b',
    borderBottom: '2px solid #00A651',
  },
  vaultContainer: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  },
  vaultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  vaultTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
  },
  vaultControls: {
    display: 'flex',
    gap: '12px',
  },
  riskToggle: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    color: '#64748b',
    fontSize: '0.8rem',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  riskActive: {
    borderColor: '#DC2626',
    color: '#DC2626',
    background: 'rgba(220, 38, 38, 0.1)',
  },
  logsTableWrapper: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  vaultTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.8rem',
  },
  vaultTh: {
    textAlign: 'left',
    padding: '12px',
    background: '#ffffff',
    color: '#64748b',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: '600',
  },
  vaultThSticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    boxShadow: 'inset 0 -1px 0 #e5e7eb',
  },
  vaultTr: {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background 0.2s',
  },
  vaultTd: {
    padding: '12px',
    color: '#1e293b',
  },
  settingsSection: {
    marginTop: 'auto',
    padding: '1.5rem',
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
  },
  settingsTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  settingsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  settingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
  },
  settingLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  settingDesc: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  settingControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  settingStatus: {
    fontSize: '0.65rem',
    fontWeight: 800,
    letterSpacing: '0.08em',
    minWidth: '28px',
    textAlign: 'right',
    userSelect: 'none',
  },
  watermarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.1,
    zIndex: 10,
    padding: '2rem',
    overflow: 'hidden',
  },
  watermarkText: {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: '#1e293b',
    transform: 'rotate(-45deg)',
    whiteSpace: 'nowrap',
    margin: '40px',
  },
  switchingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.65)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(8px)',
  },
  assignmentPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '450px',
    height: '100%',
    background: '#ffffff',
    borderLeft: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.12)',
  },
  assignmentHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentBody: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
  },
  assignmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '1.5rem',
  },
  assignmentItem: {
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s',
  },
  roleSelect: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    color: '#0f172a',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    outline: 'none',
  },
  assignmentFooter: {
    padding: '1.5rem',
    borderTop: '1px solid #e5e7eb',
  },
  manageBtn: {
    background: 'rgba(0, 166, 81, 0.1)',
    color: '#00A651',
    border: '1px solid rgba(0, 166, 81, 0.2)',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  reportGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  kpiCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  kpiLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  kpiValue: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#0f172a',
  },
  chartCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.5rem',
  },
};
