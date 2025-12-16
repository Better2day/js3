-- 1. 특정 사용자가 주문한 주문 목록 시간을 모두 출력하시오

-- 아래 쿼리로 주문 횟수가 많은 고객 샘플 확보. 그 중 임의 고객 UUID로 주문 목록 시간 쿼리 실행
-- SELECT UserId, count(Id) AS OrderCount
--   FROM orders
--  GROUP BY UserId
--  ORDER BY OrderCount DESC;

SELECT u.Name AS 고객명,
       o.OrderAt AS 주문시간
  FROM orders o
  JOIN users u ON o.UserId = u.Id
 WHERE u.Id = 'f01499a4-2345-426a-a6ad-446202e675cb'
 ORDER BY 주문시간;
