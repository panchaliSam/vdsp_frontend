import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { patchMyProfile, getUserById } from '@app_api/User.API';
import type { UserDto } from '@app_interfaces/User/UserDto';
import type { UserUpdateDto } from '@app_interfaces/User/UserUpdateDto';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { capitalizeName } from '@app_helper/validations/capitalizeName';
import { validatePhoneNumber } from '@app_helper/validations/phoneNumberValidation';
import { validatePasswordStrength } from '@app_helper/validations/passwordStrengthValidation';

interface UserProfileUpdateProps {
    userId: number;
}

const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({ userId }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

    const [form, setForm] = useState<UserUpdateDto>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: undefined,
    });
    const [initialForm, setInitialForm] = useState(form);

    useEffect(() => {
        (async () => {
            try {
                const data: UserDto = await getUserById(userId);
                const loaded: UserUpdateDto = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    password: undefined,
                };
                setForm(loaded);
                setInitialForm(loaded);
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        })();
    }, [userId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            const capitalized = capitalizeName(value);
            setForm(prev => ({ ...prev, [name]: capitalized }));
        } else if (name === 'phoneNumber') {
            setForm(prev => ({ ...prev, phoneNumber: value }));
            const phoneErr = validatePhoneNumber(value);
            setErrors(prev => ({ ...prev, phoneNumber: phoneErr }));
        } else if (name === 'password') {
            setForm(prev => ({ ...prev, password: value }));
            const pwErr = validatePasswordStrength(value);
            const confirmErr = confirmPassword && value !== confirmPassword
                ? "Passwords do not match" : null;
            setErrors(prev => ({ ...prev, password: pwErr, confirmPassword: confirmErr }));
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (form.password && form.password !== value) {
            setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: null }));
        }
    };

    const handleCancel = () => {
        setForm(initialForm);
        setConfirmPassword('');
        setErrors({});
        setError(null);
        setSuccessMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        const phoneErr = validatePhoneNumber(form.phoneNumber);
        const pwErr = form.password ? validatePasswordStrength(form.password) : null;
        const confirmErr = form.password && form.password !== confirmPassword
            ? "Passwords do not match" : null;

        setErrors({
            phoneNumber: phoneErr,
            password: pwErr,
            confirmPassword: confirmErr
        });

        if (phoneErr || pwErr || confirmErr) return;

        setSaving(true);
        const updatedId = await patchMyProfile(form);
        setSaving(false);

        if (updatedId != null) {
            setSuccessMsg(`Profile updated successfully (id: ${updatedId})`);
            setInitialForm(form);
            setOpenSuccessModal(true);
        }
        // No else block – do not show "Update failed"
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <>
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
                    mt: 4,
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: 'common.white' }}>
                    Update Profile
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    variant="filled"
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    variant="filled"
                    sx={{ mb: 2 }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField
                    fullWidth
                    label="New Password"
                    name="password"
                    type="password"
                    value={form.password || ''}
                    onChange={handleChange}
                    helperText={errors.password ?? "Leave blank to keep current password"}
                    error={!!errors.password}
                    variant="filled"
                    sx={{ mb: 2 }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    variant="filled"
                    sx={{ mb: 3 }}
                    InputProps={{ disableUnderline: true }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={saving}
                        sx={{ color: 'common.white', borderColor: 'common.white' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
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
            </Box>

            <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
                </DialogTitle>
                <DialogContent>
                    <Typography align="center" variant="h6">
                        Profile Updated Successfully!
                    </Typography>
                    <Box textAlign="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenSuccessModal(false)}
                        >
                            OK
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserProfileUpdate;