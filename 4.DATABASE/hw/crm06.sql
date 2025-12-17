-- 6. 특정 사용자가 방문한 상점의 빈도가 높은 순서대로 소팅하여 상위 5개만 구하시오

-- 집에서 따로 생성해서 랩탑과 데이터가 다름
-- SELECT u.Id
--   FROM orders o
--   JOIN users u ON o.UserId = u.Id
--  GROUP BY u.Id
-- HAVING count(o.id) > 15;
-- 주문이 가장 많은 사용자: 234c260b-92a5-443b-83f3-9065db0025ea

SELECT u.Name 고객명,
       s.Name 상점명,
       count(o.StoreId) As "상점별 방문수"
  FROM orders o
  JOIN users u ON o.UserId = u.Id
  JOIN stores s ON o.StoreId = s.Id
 WHERE u.Id = '234c260b-92a5-443b-83f3-9065db0025ea'
 GROUP BY o.StoreId
 ORDER BY "상점별 방문수" DESC;
