import React, { useEffect, useState } from 'react'

const AdminForms = () => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backendBaseUrl}/admin/forms`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok && data?.success) {
        setItems(data.data || [])
      } else {
        setError('Failed to load forms')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      window.location.assign('/admin')
      return
    }
    fetchItems()
  }, [])

  const viewItem = async (id) => {
    try {
      const res = await fetch(`${backendBaseUrl}/admin/forms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok && data?.success) {
        setSelected(data.data)
      }
    } catch {}
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete this submission?')) return
    try {
      const res = await fetch(`${backendBaseUrl}/admin/forms/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok && data?.success) {
        setItems((prev) => prev.filter((x) => x._id !== id))
        if (selected?._id === id) setSelected(null)
      }
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    window.location.assign('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0716', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Contact Submissions</h2>
          <button onClick={logout} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#6c4bd6', color: '#fff', cursor: 'pointer' }}>Logout</button>
        </div>
        {loading ? <div style={{ marginTop: 24 }}>Loading...</div> : null}
        {error ? <div style={{ marginTop: 12, color: '#ff6b6b' }}>{error}</div> : null}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
          <div style={{ background: '#1e1430', borderRadius: 12, padding: 16 }}>
            {items.length === 0 ? <div>No submissions</div> : (
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Service</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td style={{ padding: 8 }}>{item.name}</td>
                      <td style={{ padding: 8 }}>{item.email}</td>
                      <td style={{ padding: 8 }}>{item.service || '-'}</td>
                      <td style={{ padding: 8 }}>
                        <button onClick={() => viewItem(item._id)} style={{ marginRight: 8, padding: '6px 10px', borderRadius: 6, border: 'none', background: '#3a2a5e', color: '#fff', cursor: 'pointer' }}>View</button>
                        <button onClick={() => deleteItem(item._id)} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#ff6b6b', color: '#fff', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div style={{ background: '#1e1430', borderRadius: 12, padding: 16 }}>
            {selected ? (
              <div>
                <h3 style={{ marginBottom: 12 }}>Details</h3>
                <div style={{ marginBottom: 6 }}><strong>Name:</strong> {selected.name}</div>
                <div style={{ marginBottom: 6 }}><strong>Email:</strong> {selected.email}</div>
                <div style={{ marginBottom: 6 }}><strong>Company:</strong> {selected.company || '-'}</div>
                <div style={{ marginBottom: 6 }}><strong>Service:</strong> {selected.service || '-'}</div>
                <div style={{ marginTop: 12, whiteSpace: 'pre-wrap', background: '#120a20', padding: 12, borderRadius: 8 }}>{selected.message}</div>
              </div>
            ) : <div>Select an item to view</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminForms
