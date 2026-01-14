export default function SearchResults({ results }) {

  return (
    <ul>
      {
        results.map((item, index) => (
          <li key={index}>
            {/* XSS (Cross-Site Script)를 방지하기 위해서 tag는 프로세싱하지 않는 게 기본
            그런데 위험을 무릎쓰고 처리하겠다는 것이 dangerouslySetInnerHTML={{__html: 사용자입력데이터}} */}
            <a href={item.link} target="_blank"><h5 dangerouslySetInnerHTML={{ __html: item.title }}></h5></a>
            <p>{item.description}</p>
            <small>{item.postdate}</small>
          </li >
        ))
      }
    </ul >
  )
}