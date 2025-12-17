-- 7. 구매한 매출액의 합산이 가장 높은 사용자 10명을 구하고 각각의 매출액을 구하시오

SELECT u.Name 고객명,
       sum(i.UnitPrice) As 매출액
  FROM orders o
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
  JOIN users u ON o.UserId = u.Id
 GROUP BY u.Id
 ORDER BY 매출액 DESC
 LIMIT 10;
