export default function SearchInput({ keyword, onChange }) {
  return (
    <>
      <input
        className="m-3"
        placeholder="검색할 사용자 이름을 입력하세요"
        value={keyword}
        onChange={e => onChange(e.target.value)} />
      <button>사용자 검색</button>
    </>
  )
}
