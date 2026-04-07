const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const users = [
            {
                id: 1,
                username: 'admin',
                password: 'password',
                role: 'admin',
                name: 'Administrator (Pool)',
            },
            {
                id: 2,
                username: 'manager',
                password: 'password',
                role: 'approver',
                level: 1,
                name: 'Bapak Manager (Approver 1)',
            },
            {
                id: 3,
                username: 'direktur',
                password: 'password',
                role: 'approver',
                level: 2,
                name: 'Bapak Direktur (Approver 2)',
            },
        ]

        const user = users.find(
            (u) => u.username === username && u.password === password
        )

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Username atau password salah',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token: 'dummy-token-123456',
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                level: user.level || null,
                name: user.name,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message,
        })
    }
}

module.exports = { login }