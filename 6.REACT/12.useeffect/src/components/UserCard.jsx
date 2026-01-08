export default function UserCard({ user, onRemove }) {
  return (
    <li
      // key={user.id}
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12
      }}>

      {/* Conditional rendering */}
      {onRemove && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <h3>{user.name}</h3>
          <button type="button" onClick={() => onRemove(user.id)}>삭제</button>
        </div>
      )}

      <p>이메일: {user.email}</p>
      <p>휴대폰: {user.phone}</p>
      <p>회사: {user.company.name}</p>
      <p>주소: {user.address.city}, {user.address.street}</p>
    </li>
  )
}
