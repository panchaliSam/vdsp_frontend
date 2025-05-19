import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { patchUserProfile, getUserById } from '@app_api/User.API';
import type { UserDto } from '@app_interfaces/User/UserDto';
import type { UserUpdateDto } from '@app_interfaces/User/UserUpdateDto';

interface UserProfileUpdateProps {
    userId: number;
}

const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({ userId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<UserUpdateDto>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: undefined,
    });

    // Fetch current user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data: UserDto = await getUserById(userId);
                setForm({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    password: undefined,
                });
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
            await patchUserProfile(userId, form);
            setSuccess('Profile updated successfully');
        } catch (err: any) {
            setError(err.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                bgcolor: 'grey.900',
                color: 'common.white',
                p: 4,
                borderRadius: 2,
                maxWidth: 500,
                mx: 'auto',
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ color: 'common.white' }}>
                Update Profile
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                variant="filled"
                sx={{ mb: 2, input: { color: 'common.white' }, label: { color: 'common.white' } }}
                InputProps={{ disableUnderline: true }}
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                variant="filled"
                sx={{ mb: 2, input: { color: 'common.white' }, label: { color: 'common.white' } }}
                InputProps={{ disableUnderline: true }}
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                variant="filled"
                sx={{ mb: 2, input: { color: 'common.white' }, label: { color: 'common.white' } }}
                InputProps={{ disableUnderline: true }}
            />
            <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                value={form.password || ''}
                onChange={handleChange}
                helperText="Leave blank to keep current password"
                variant="filled"
                sx={{ mb: 3, input: { color: 'common.white' }, label: { color: 'common.white' } }}
                InputProps={{ disableUnderline: true }}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={saving}
                sx={{
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    '&:hover': { bgcolor: 'primary.dark' },
                }}
            >
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
            </Button>
        </Box>
    );
};

export default UserProfileUpdate;
