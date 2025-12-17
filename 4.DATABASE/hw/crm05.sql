-- 5. 상점별 월간 통계(매출액)을 구하시오

SELECT u.Name AS 고객명,
       sum(i.UnitPrice) AS 총매출액
  FROM orders o
  JOIN users u ON o.UserId = u.Id
  JOIN stores s ON o.StoreId = s.Id
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
 WHERE u.Id = 'f01499a4-2345-426a-a6ad-446202e675cb';


SELECT  type,
	   count(name) AS num_of_stores
  FROM stores s,

       

 GROUP BY type
HAVING num_of_stores >= 20
 ORDER BY num_of_stores DESC;



SELECT Type,
       avg(UnitPrice)
  FROM items
 GROUP BY Type;

SELECT Name,
       UnitPrice
  FROM items
 ORDER BY UnitPrice DESC
 LIMIT 5;