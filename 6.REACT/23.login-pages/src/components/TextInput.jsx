export default function TextInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  inputRef = null,
}) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        ref={inputRef}
      />
    </label>
  )
}

// export default function TextInput({
//   label,
//   type = 'text',
//   value,
//   onChange
// }) {
//   return (
//     <form>
//       {/* <TextInput label="아이디" />
//       <TextInput label="비밀번호" type="password" />
//       <button type="submit">로그인</button> */}
//       <span>{label}:</span>
//       <input type={type} value={value} onChange={e => onChjange(name, e.target.value)} />
//     </form>
//   )
// }
