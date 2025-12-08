import React, { useState } from 'react'

const AdminLogin = () => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backendBaseUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok && data?.success && data?.token) {
        localStorage.setItem('admin_token', data.token)
        window.location.assign('/admin/forms')
      } else {
        setError('Invalid credentials')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0716' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, padding: 24, borderRadius: 12, background: '#1e1430', color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <h2 style={{ marginBottom: 16 }}>Admin Login</h2>
        <label style={{ display: 'block', marginBottom: 8 }}>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #3a2a5e', background: '#120a20', color: '#fff', marginBottom: 12 }} />
        <label style={{ display: 'block', marginBottom: 8 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #3a2a5e', background: '#120a20', color: '#fff', marginBottom: 16 }} />
        {error ? <div style={{ color: '#ff6b6b', marginBottom: 12 }}>{error}</div> : null}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#6c4bd6', color: '#fff', cursor: 'pointer' }}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  )
}

export default AdminLogin
