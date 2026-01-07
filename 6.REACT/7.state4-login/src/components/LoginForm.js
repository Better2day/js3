import TextInput from './TextInput';

export default function LoginForm({ form, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
      <TextInput label="ID" name="id" value={form.id} onChange={onChange} />

      {/* 한 줄이 너무 길어지면 실무에서도 아래처럼 쓰는 경우가 매우 많다. 단, 당연히 일관성 있게 맞춰야 한다. */}
      <TextInput
        label="비밀번호"
        name="pw"
        type="password"
        value={form.pw}
        onChange={onChange}
      />

      <button type="submit">로그인</button>
    </form>
  )
}
