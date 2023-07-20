USE [ZooEtc]
GO

set identity_insert [Users] on
insert into Users ([Id],FirebaseUserId, FirstName, LastName, UserName, Email, isAdmin) values (1, '0Mea1S95LIT3B3vJqhgq7djdVsN2', 'Laura', 'Furnivall', 'grrlaurabear', 'laura@laurafurnivall.com', 1);
insert into Users ([Id],FirebaseUserId, FirstName, LastName, UserName, Email, isAdmin) values (2, 'apq0dyszecYxJDW0JokS9wpwLLe2', 'Zoo', 'Keeper', 'khaki4eva', 'zoo@keeper.com', 0);
set identity_insert [Users] off


set identity_insert [Zoos] on
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (1, 'Nashville Zoo', '3777 Nolensville Pike, Nashville, TN 37211', '(615) 833-1534', 'https://en.wikipedia.org/wiki/Nashville_Zoo_at_Grassmere#/media/File:NashvilleZooGrassmereLogo.png', 'https://www.nashvillezoo.org/', 'The Nashville Zoo at Grassmere is a zoological garden and historic plantation farmhouse located 6 miles southeast of Downtown Nashville.');
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (2, 'Cheyenne Mountain Zoo', '4250 Cheyenne Mountain Zoo Rd, Colorado Springs, CO 80906', '(719) 633-9925', 'https://en.m.wikipedia.org/wiki/Cheyenne_Mountain_Zoo#/media/File%3ACheyenne_Mountain_Zoo_logo.png', 'https://www.cmzoo.org/', 'The Cheyenne Mountain Zoo is a zoological park located southwest of downtown Colorado Springs, Colorado, on Cheyenne Mountain in the United States.');
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (3, 'Hattiesburg Zoo', '107 S 17th Ave, Hattiesburg, MS 39401', '(601) 545-4576', 'https://zoocouponsonline.com/wp-content/webp-express/webp-images/uploads/2011/08/hattiesburg-zoo-logo-e1317870918446.jpg.webp', 'https://hattiesburgzoo.com/', 'The Hattiesburg Zoo is a small 12-acre zoo located within Kamper Park in Hattiesburg, Mississippi, United States. The zoo is operated by the Hattiesburg Convention Commission.');
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (4, 'Indianapolis Zoo', '1200 W Washington St, Indianapolis, IN 46222', '(317) 630-2001', 'https://th.bing.com/th/id/R.b36aa8db5430594a3c45bbe299b342d4?rik=KUYBxLqLZLF54g&riu=http%3a%2f%2fwww.romanhynek.cz%2fzoo%2fimg_zoopictures%2floga%2findianapolis-zoo.gif&ehk=CSxDnpPglxy51hd3m7mn4ALHYP%2fDvCYA8be5At0MFPk%3d&risl=&pid=ImgRaw&r=0', 'https://www.indianapoliszoo.com/', 'The Indianapolis Zoo is a zoo located in White River State Park, in Indianapolis, Indiana, United States, housing more than 3,800 animals of more than 320 species and subspecies.');
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (5, 'Brevard Zoo', '8225 N Wickham Rd, Melbourne, FL 32940', '(321) 254-9453', 'https://brevardzoo.org/wp-content/themes/brevardzoo/images/logos/BrevardZooLogoHorz.png', 'https://brevardzoo.org/', 'Brevard Zoo is a 75-acre nonprofit facility located in Melbourne, Florida, United States, that is home to more than 900 animals representing more than 195 species from Florida, South America, Africa, Asia, and Australia. ');
insert into Zoos ([Id], ZooName, [Address], PhoneNumber, ZooImgUrl, ZooUrl, [Description]) values (6, 'Columbus Zoo', '4850 Powell Rd, Powell, OH 43065', '(614) 645-3400', 'https://www.columbuszoo.org/sites/default/files/zoo-logo.png', 'https://www.columbuszoo.org/', 'The Columbus Zoo and Aquarium is a non-profit zoo located near Powell in Liberty Township, Delaware County, Ohio, United States, north of the city of Columbus.');
set identity_insert [Zoos] off


set identity_insert [ZooReviews] on
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (1, 1, 1, '2023-01-01', 5, 3, 5, 3, 2, 3, 4, 'Loved my experience at the Nashville Zoo! But would love to see an improvement in pay commiserate to the area, communication and benefits.', 1);
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (2, 1, 2, '2023-04-14', 5, 5, 5, 2, 3, 4, 3, 'I worked here as a green keeper and truly enjoyed my experience. The onboarding process was superb!', 1);
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (3, 1, 3, '2023-06-15', 4, 2, 1, 3, 5, 2, 3, 'The zookeepers are a wonderful bunch, but management is toxic.', 1);
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (4, 2, 5, '2023-04-15', 5, 5, 5, 5, 3, 4, 4, 'Literally the best zoo ever!', 1);
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (5, 2, 1, '2023-05-15', 5, 4, 5, 4, 4, 4, 3, 'Nashville has so much potential and is going through so much growth. Sometimes there are growing pains, but its been a fantastic experience.', 1);
insert into [ZooReviews] ([Id], UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved) values (6, 2, 6, '2023-03-15', 5, 4, 5, 5, 3, 4, 5, 'Opportunity for growth and learning is amazing!', 1);
set identity_insert [ZooReviews] off


set identity_insert [Uniforms] on
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (1, 'Dickies Mens 11 Inch Relaxed-Fit Stretch-Twill Work Short', 'This short features a casual waistband w/ a hook and eye closure & our signature tunnel belt loops for extra belt support, plus slant hand pockets, welt back pockets & a handy multi-use pocket on the right leg for phone, keys & more.', 'https://www.amazon.com/gp/product/B00EC83R2E/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/61TZU0dZwTL._AC_UX569_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (2, 'Columbia Womens Coral Point Iii Short', 'Our PFG line of shorts are crafted for those who love to fish, explore, and adventure around water. These sun-loving shorts are designed to keep you protected and comfortable.', 'https://www.amazon.com/gp/product/B07RFP32GP/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/71u65PijFOL._AC_UX466_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (3, 'KEEN Womens Whisper Closed Toe Sport Sandals', 'Built on a women-specific foot form that is wider than the industry norm for improved fit and comfort; Non-removable EVA footbed with added arch support for all-day comfort', 'https://www.amazon.com/gp/product/B00ZG2IW34/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/81JVy9J0awL._AC_UX395_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (4, 'Muck Boot Womens Rain Boot', 'Fully protected from wet, windy, snow, mud, and sticky situations.', 'https://www.amazon.com/gp/product/B01NBUINRY/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/81ht93wSbkL._AC_UY500_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (5, 'Merrell Womens All Out Blaze Sieve Low Rise Hiking Shoes', 'Leather sole, Full grain leather upper, Integrated lacing system for a glove-like fit, Neoprene stretch collar for easy on and off', 'https://www.amazon.com/gp/product/B07845JTQ6/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/619mhDIO-XL._AC_UX500_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (6, 'Columbia Womens Redmond Low Rise Hiking Shoes', 'The Redmond Waterproof Hiking Shoe features our Omni-Tech seam-sealed membrane bootie construction, combined with our Techlite lightweight midsole, for long-lasting comfort with superior cushioning and high energy return', 'https://www.amazon.com/gp/product/B00GW8HRUA/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1', 'https://m.media-amazon.com/images/I/71JTiR+MRfS._AC_UY535_.jpg');
insert into [Uniforms] ([Id], [Title], [Description], PurchaseUrl, ImageUrl) values (7, 'PolarSpex Mens Sunglasses - Retro Sunglasses for Men, Polarized Sunglasses for Womens - Cool Shades for Driving, Fishing', 'UV PROTECTION SUNGLASSES - Stylish mens sunglasses that come with 100% UV (UVA & UVB) protection TAC polarized antiglare lenses. Cool blenders sunglasses for men, women adult and also for teenagers that is perfect for fishing, driving, and outings.', 'https://www.amazon.com/gp/product/B0718WMXVH/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1', 'https://m.media-amazon.com/images/I/61AMoomSLBL._AC_SX569._SX._UX._SY._UY_.jpg');
set identity_insert [Uniforms] off


set identity_insert [Types] on
insert into [Types] ([Id], [Type])
values (1, 'Clothing'), (2, 'Pants'), (3, 'Shorts'), (31, 'Capris'), (4, 'Maternity'), (5, 'Maternity Pants'), (6, 'Maternity Shorts'), (7, 'Tops'), (8, 'Maternity Tops'), (9, 'Short Sleeve'), (10, 'Long Sleeve'), (11, 'Shoes'), (12, 'Boots'), (13, 'Rain boots'), (14, 'Muck boots'), (15, 'Sandals'),
(16, 'Hiking Shoes'), (17, 'Steel-Toed Boots'), (18, 'Close toe Sandals'), (19, 'Water bottles'), (20, 'Pocket knives'), (21, 'Hats'), (22, 'Sunglasses'), (23, 'Bug Spray'), (24, 'Sunscreen'), (25, 'Belts'), (26, 'Jackets'), (27, 'Rain Jacket'), (28, 'Winter Jacket'), (29, 'Coats'), (30, 'Winter Hats');
set identity_insert [Types] off


set identity_insert [UniformReviews] on
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (1, 2, 1, '2023-07-20', 5, 3, 4, 'Needs more pockets', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (2, 1, 2, '2023-07-20', 5, 3, 4, 'Good for the keeper that doesnt need a lot of pockets.', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (3, 1, 3, '2023-07-20', 3, 3, 4, 'Only lasted one year', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (4, 1, 4, '2023-07-20', 5, 3, 4, 'Great muck boot, very comfortable, they are a little short and I ended getting a lot of water, feces, etc in them often.', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (5, 1, 5, '2023-07-20', 5, 3, 4, 'Lasted about a year in zookeeper worklife.', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (6, 1, 6, '2023-07-20', 5, 3, 4, 'Great!', 1);
insert into [UniformReviews] ([Id], UserId, UniformId, ReviewDate, Longetivity, Versatility, Comfort, Comments, isApproved) values (7, 1, 7, '2023-07-20', 5, 2, 2, 'Squeezed my ginormous head too much, but also they broke.', 1);
set identity_insert [UniformReviews] off


set identity_insert [JobListings] on
insert into [JobListings] ([Id], [ZooId], [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl) values (1, 1,'Area Supervisor - Hoofstock', '2023-06-15', '2023-08-15', 'Nashville Zoo is currently seeking a highly motivated and experienced individual to join our Hoofstock Team as a Hoofstock Area Supervisor.','$40,000 - $50,000','https://www.paycomonline.net/v4/ats/web.php/jobs/ViewJobDetails?job=100833&clientkey=AC4F4714184226FB5288AB0BE0259814');
insert into [JobListings] ([Id], [ZooId], [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl) values (2, 1,'Area Supervisor - Aquatics', '2023-04-15', '2023-09-15', 'Primary responsibility is to supervise keeper staff and participate in the general care of assigned collection animals and work on conservation initiatives.','$40,000 - $50,000','https://www.paycomonline.net/v4/ats/web.php/jobs/ViewJobDetails?job=94604&clientkey=AC4F4714184226FB5288AB0BE0259814');
insert into [JobListings] ([Id], [ZooId], [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl) values (3, 2,'SEASONAL HORTICULTURALIST / HORTICULTURE ASSISTANT', '2023-07-20', '2023-11-15', 'The Cheyenne Mountain Zoo is looking to round out our horticulture team.','$15.00 per hour','https://www.cmzoo.org/careers/');
insert into [JobListings] ([Id], [ZooId], [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl) values (4, 4,'Elephants Keeper','2023-07-19', '2023-08-30', 'Prior professional work experience working with elephants is required, prior experience working with African elephants and especially elephant births and calves is preferred.','$20.00 per hour','https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=a8cad7ee-180d-4ee7-8732-f82f49d31cc6&ccId=19000101_000001&lang=en_US&selectedMenuKey=CareerCenter&jobId=460483');
insert into [JobListings] ([Id], [ZooId], [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl) values (5, 5,'Conservation Zoologist', '2023-06-15', '2024-01-20', 'This position is responsible for completing the daily care of animals in the Zoo�s Conservation Animal Programs and the maintenance of habitats and enclosures.','$20.00 per hour','https://brevardzoo.org/wp-content/uploads/2023/01/Conservation-Zoologist.pdf');
set identity_insert [JobListings] off


set identity_insert [UniformTypes] on
insert into [UniformTypes] ([Id], [TypeId], [UniformId])
values (1, 1, 1), (2, 3, 1), (3, 1, 2), (4, 3, 2), (5, 11, 3), (6, 15, 3), (7, 18, 3), (8, 11, 4), (9, 12, 4), (10, 13, 4), (11, 14, 4), (12, 11, 5),(13, 15, 5),(14, 18, 5),(15, 11, 6),(16, 12, 6),(17, 16, 6),(18, 22, 7);
set identity_insert [UniformTypes] off
