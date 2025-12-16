-- 4. 특정 사용자가 주문한 매출액의 합산을 구하시오
-- 고객은 crm01.sql에서 선택한 'f01499a4-2345-426a-a6ad-446202e675cb' 계속 사용

SELECT u.Name AS 고객명,
       sum(i.UnitPrice) AS 총매출액
  FROM orders o
  JOIN users u ON o.UserId = u.Id
  JOIN stores s ON o.StoreId = s.Id
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
 WHERE u.Id = 'f01499a4-2345-426a-a6ad-446202e675cb';
