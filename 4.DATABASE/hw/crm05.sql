-- 5. 상점별 월간 통계(매출액)을 구하시오

SELECT s.Name,
       strftime('%Y년%m월', o.OrderAt),
       sum(i.UnitPrice) AS "상점별 월별 매출액"
  FROM stores s
  JOIN orders o ON s.Id = o.StoreId
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
 GROUP BY s.Id, strftime('%Y년%m월', o.OrderAt)
 LIMIT 100;
 