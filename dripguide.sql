-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2022 at 04:39 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dripguide`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `Id` int(11) NOT NULL,
  `Title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Description` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Description2` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `FK_User` int(11) NOT NULL,
  `SubmitDate` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `Status` int(11) NOT NULL,
  `FK_Brand` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Colorway` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Material` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Price` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `ReleaseDate` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `StyleCode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Image` varchar(200) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`Id`, `Title`, `Description`, `Description2`, `FK_User`, `SubmitDate`, `Status`, `FK_Brand`, `Colorway`, `Material`, `Price`, `ReleaseDate`, `StyleCode`, `Image`) VALUES
(1, 'Yeezy Boost 350 V2 Triple White', 'The luminous colored adidas Yeezy Boost 350 V2 has a cream white upper, core white midsole, and a camouflaged “SPLY-350” branding across the stripe on the sides.', '', 21, '2022-05-15 16:07:33', 1, 'Kanye West, Adidas', 'CREAM/WHITE', 'Primeknit, \"boost\" material, rubber', '$220', '2017-04-29 00:00:00', 'CP9366', 'https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Cream-White/Images/adidas-Yeezy-Boost-350-V2-Cream-White/Lv2/img01.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635177789&h=320&q=75'),
(2, 'Jordan 6 Travis Scott', 'Travis Scott and Jordan Brand team up once again for the Jordan 6 Retro Travis Scott. This is the fourth Air Jordan silhouette that Cactus Jack has touched. This sneaker made its mainstream debut when Travis rocked them on stage during his Super Bowl LIII performance and the rest is history.', 'This AJ 6 features an olive upper with black detailing and red contrasting accents on the tongue and lace locks. A side cargo pocket is displayed on the collar, giving this sneaker a design modification that makes it the first of its kind. A sail midsole, glow-in-the-dark translucent outsole, 3M det', 21, '2022-05-15 16:02:16', 1, 'Travis Scott, Air Jorda, Nike', 'MEDIUM OLIVE/BLACK-SAIL-UNIVERSITY RED', 'Suede, rubber, synthetic textile', '$250', '2019-10-11 00:00:00', ' CN1084-200', 'https://images.stockx.com/images/Air-Jordan-6-Retro-Travis-Scott-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611191963'),
(3, 'Jordan 4 Travis Scott', 'The only way to describe the Travis Scott Air Jordan 4 Retros properly would be to use the rappers own adlib: la flame. These Jordan 4s were made in collaboration with rapper, Travis Scott and nicknamed the \"Cactus Jack\" edition. Similar in design to the infamous Eminem pair, these feature a lighter shade of blue suede on the upper. Black accents, a red liner, paint splatter detailing, a white midsole and \"Cactus Jack\" branding on the back heel tab finish things off for this pair.', 'If you’re a fan of Travis Scott and the AJ 4, this pair is another must-have.', 21, '2022-05-15 16:04:22', 1, 'Travis Scott, Air Jordan, Nike', 'UNIVERSITY BLUE/BLACK-VARSITY RED', 'Suede, rubber, synthetic textile', '$225', '2018-06-09 00:00:00', ' 308497-406', 'https://image.goat.com/crop/750/attachments/product_template_additional_pictures/images/012/478/528/original/365514_01.jpg.jpeg'),
(4, 'Jordan 1 High Chicago 2015', 'The shoe that started it all. In 1984, Nike unveiled the Nike Air Jordan and captivated the world. The design merged sports and fashion worlds with its luxe appeal, and now is a street classic. In 2015, Jordan Brand reissued the Chicago colorway in its original form with the Jordan 1 Retro Chicago (2015).', 'The Jordan 1 Retro Chicago (2015) features white, red, and black premium leather uppers with white panels used as a base, Varsity Red overlays wrapping around it, and deep black hues rounding out the Nike \"Swooshes\" and other accents. From there, a minimal \"Nike Air\" logo and a red outsole to match ', 21, '2022-05-15 22:35:35', 1, 'Air Jordan, Nike', 'WHITE/VARSITY RED-BLACK', 'Leather, rubber', '$160', '2015-05-30 00:00:00', '555088-101', 'https://images.stockx.com/images/Air-Jordan-1-Retro-Chicago-2015-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1607656901'),
(5, 'Yeezy Boost 350 V2 Core Black White', 'The adidas Yeezy 350 V2 Core Black White features a simple black Primeknit upper with \"SPLY-350\" text on a cream side stripe. From there, responsive Boost technology in the sole offers comfort and support.', '', 21, '2022-05-15 22:03:20', 1, 'Kanye West, Adidas', 'CORE BLACK/CORE WHITE/CORE BLACK', 'Primeknit, \"boost\" material', '$220', '2016-12-17 00:00:00', 'BY1604', 'https://www.kicksonfire.com/wp-content/uploads/2022/03/adidas-yeezy-boost-350-v2-oreo-2022-4.jpeg'),
(7, 'Jordan 1 High Union LA Black Toe', 'Lights, Cameras, Action! Nike has officially gone Hollywood and released the Jordan 1 Retro High Union Los Angeles Black Toe. This unique Jordan 1 comes with a white leather upper with a red accent, black Nike \"Swoosh\", cream midsole, and red sole.', '', 21, '2022-05-15 22:36:23', 1, 'Union LA, Air Jordan, Nike', 'WHITE/BLACK-VARSITY RED-WOLF GREY', 'Leather, suede, rubber, synthetic textile', '$190', '2018-11-17 00:00:00', 'BV1300-106', 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Union-Los-Angeles-Black-Toe-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1645549885'),
(8, 'Yeezy Boost 700 Wave Runner', 'The Yeezy 700 Boost Wave Runner is the shoe that led Yeezy\'s pivot from a sleek, minimal aesthetic to a chunky, 90s inspired one. This was the gateway sneaker between knit runners like the 350 and the grungy skate look of the 550. The Yeezy 700 Wave Runner features a grey mesh and leather upper with black suede overlays and teal mesh underlays. At the base, a thick Boost sole and contrasting hits of orange complete the design.', '', 21, '2022-05-15 16:18:03', 1, 'Kanye West, Adidas', 'SOLID GREY/CHALK WHITE/CORE BLACK', 'Leather, suede, mesh, rubber', '$300', '2017-11-01 00:00:00', 'B75571', 'https://images.stockx.com/images/adidas-Yeezy-Wave-Runner-700-Solid-Grey-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1628533740'),
(9, 'Balenciaga Track 1 White Orange', 'A very unusual sneaker from Balenciaga. The word \"Track\" embossed at the back of the heel, double laces knotted in a usual equipment way, written size at the edge of the toe. \"Balenciaga\" printed on the exterior and embossed on the tongue.', '', 21, '2022-05-15 16:21:29', 1, 'Balenciaga', ' WHITE/ORANGE', 'Polyurethane, polyester, nylon', '$1120', '2018-09-03 00:00:00', ' 542023W1GB19059', 'https://sneakerswala.com/wp-content/uploads/2021/06/Balenciaga-Track-White-Orange-1.jpg'),
(10, 'Balenciaga Triple S Black 2021', 'Chunky sneaker from Balenciaga.', '', 21, '2022-05-15 16:25:46', 1, 'Balenciaga', 'BLACK/BLACK', 'Suede, nylon, rubber', '$995', '2021-02-14 00:00:00', '534217W2CA11000', 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2020%2F12%2Fbalenciaga-triple-s-designer-sneakers-black-colorway-price-where-to-buy-1.jpg?q=75&w=800&cbr=1&'),
(11, 'Jordan 1 High Off-White Chicago', 'The Off-White x Air Jordan 1 Retro High OG was one of the most highly anticipated footwear collaborations of 2017. It marked the first time Virgil Abloh, founder of the Milan-based fashion label and Jordan Brand had teamed up. Nicknamed \"The 10\" edition, this pair comes in the original Chicago-themed white, black and varsity red colorway. Featuring a white, red and black-based deconstructed leather upper with a Swooshless medial side branded with \"Off-White for Nike Air Jordan 1, Beaverton, Oreg', 'Other details include: floppy ankle collars with hidden “85” written on the inside, an oversized off-centered Swoosh on the lateral sides, \"Air\" written on the midsole and the word \"Shoelaces\" on the laces with no branding on the tongue.', 21, '2022-05-15 22:35:45', 1, 'Virgil Abloh, Off-White, Air Jordan, Nike', 'WHITE/BLACK-VARSITY RED', 'Leather, rubber, foam, nylon', '$190', '2017-11-09 00:00:00', 'AA3834-101', 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Off-White-Chicago-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1641327826'),
(12, 'Jordan 1 High Travis Scott', 'Grab a pack of coffee beans to match the Jordan 1 Retro High Travis Scott. This AJ1 comes with a brown upper plus white accents, black Nike \"Swoosh\", sail midsole, and a brown sole.', '', 21, '2022-05-15 22:36:15', 1, 'Travis Scott, Air Jordan, Nike', 'SAIL/BLACK-DARK MOCHA-UNIVERSITY RED', 'Suede, rubber, synthetic textile', '$175', '2019-05-11 00:00:00', 'CD4487-100', 'https://cdn.flightclub.com/TEMPLATE/806920/1.jpg'),
(13, 'Raf Simons Cropped RS Sweater', 'Oversized and cropped knit sweater by Raf Simons. Features long sleeves, ribbed crew neck, \"RS\" motif print at front.', '', 21, '2022-05-15 16:36:50', 1, 'Raf Simons', 'Navy', 'Wool', '$875', '2019-08-01 00:00:00', '192-844-00044', 'https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F0a%2F86%2Fsweater_1_2-f06c0df5e7ed871424087285a431.jpg?fit=max&w=1080&q=90'),
(14, 'Jordan 4 Off-White Sail W', 'Jordan Brand and Virgil Abloh teamed up once again to release the third silhouette in their collaborative history with the women\'s Jordan 4 Retro Off-White Sail (W). After teasing the release of the Off-White 4 with samples in his MCA exhibit and presenting them in his Off-White FW2020 Women’s Show, Virgil Abloh finally delivered what might be the most anticipated release of 2020.', 'The Air Jordan 4 Sail features full-grain leather uppers with hits of mesh and translucent materials on the toebox and heel of the shoe. From there, hits of light blue on the tongue’s Jumpman and the outsole’s Nike Swoosh provide contrast to the sail colored sneaker.', 21, '2022-05-15 17:41:28', 1, 'Virgil Abloh, Off-White, Air Jordan, Nike', 'SAIL/MUSLIN-WHITE-BLACK', 'Suede, rubber, synthetic textile', '$200', '2020-07-25 00:00:00', 'CV9388-100', 'https://images.stockx.com/images/Air-Jordan-4-Retro-Off-White-Sail-W-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1607655526'),
(17, 'Jordan 1 High Reverse Shattered Backboard', 'The Reverse Shattered Backboard Air Jordan 1 Retro, also known as the Shattered Backboard 2.0, follows up the first release with a new take on the classic Jordan shoe. ', '', 21, '2022-05-15 22:35:56', 1, 'Air Jordan, Nike', 'SAIL/STARFISH-BLACK', 'Leather, rubber, synthetic textile', '$160', '2016-10-08 00:00:00', '555088-113', 'https://images.stockx.com/images/Air-Jordan-1-Retro-Reverse-Shattered-Backboard-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1648065416'),
(18, 'Balenciaga Track 1 White', 'A very unusual sneaker from Balenciaga. The word \"Track\" embossed at the back of the heel, double laces knotted in a usual equipment way, written size at the edge of the toe. \"Balenciaga\" printed on the exterior and embossed on the tongue.', '', 21, '2022-05-15 21:51:43', 1, 'Balenciaga', 'WHITE/WHITE', 'Polyurethane, polyester, nylon', '$835', '2019-11-08 00:00:00', '542023W1GB19000', 'https://images.stockx.com/images/Balenciaga-Track-White.png?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1607662596'),
(19, 'Rick Owens Ramones DRKSHDW Canvas', 'Converse like sneakers from designer Rick Owens.', '', 21, '2022-05-15 17:52:31', 1, 'Rick Owens', 'BLACK/SAIL', 'Canvas, rubber, synthetic textile', '$615', '2020-02-13 00:00:00', '8052280560820', 'https://vrients.kleecks-cdn.com/media/media/catalog/product/cache/13/image/1200x/602f0fa2c1f0d1ba5e241f914e856ff9/2/8/2828_sneakers_vrients_vrnts_rick_owens_drkshdw_shop_online_ss2017_01_1.jpg'),
(23, 'Yeezy Boost 350 V2 Blue Tint', 'In a similar pattern to the renowned adidas Yeezy Boost 350 V2 Zebra, the adidas Yeezy Boost 350 V2 Blue Tint features a marbled grey Primeknit upper with a light grey side stripe that is decorated with bright red SPLY-350 text. At the base, a Blue Tint semi-translucent Boost sole adds cushioning and support.', '', 21, '2022-05-15 21:55:00', 1, 'Kanye West, Adidas', 'BLUE TINT/GREY THREE/HIGH RISK RED', 'Primeknit, \"boost\" material, rubber', '$220', '2017-12-16 00:00:00', 'B37571', 'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Blue-Tint-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606322199'),
(27, 'Jordan 1 High Union LA Blue Toe', 'Catch everyone’s eye while rocking the Jordan 1 Retro High Union Los Angeles Blue Toe. This Jordan 1 is sporting a white leather upper with blue accents, blue Nike “Swoosh”, cream midsole, and a blue sole.', '', 21, '2022-05-15 22:36:40', 1, 'Union LA, Air Jordan, Nike', 'WHITE/BLACK-VARSITY RED-WOLF GREY', 'Leather, suede, rubber, synthetic textile', '$190', '2018-11-17 00:00:00', 'BV1300-106', 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Union-Los-Angeles-Blue-Toe-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606325468'),
(33, 'Nike Air Force 1 Low Off-White Virgil Abloh AF100', 'This Air Force 1 designed by Virgil Abloh dropped at ComplexCon 2017 in celebration of the silhouette’s 35th anniversary. It features a white leather upper with a metallic silver Swoosh and an orange tag. It also comes with a chunky foam tongue and signature “AIR” branding on the midsole.', '', 21, '2022-05-15 22:25:37', 1, 'Virgil Abloh, Off-White, Nike', 'WHITE/METALLIC SILVER-SAIL', 'Leather, rubber, synthetic textile', '$150', '2017-11-04 00:00:00', ' AO4297-100', 'https://images.stockx.com/images/Nike-Air-Force-1-Low-Virgil-Abloh-Off-White-AF100-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1607046126'),
(36, 'Jordan 1 High Shattered Backboard', 'The legend of the colorway comes from the fact that Michael Jordan shattered the backboard with one of his iconic slam dunks on a Nike exhibition tour back in 1985. ', '', 21, '2022-05-15 22:36:06', 1, 'Air Jordan, Nike', 'BLACK/STARFISH-SAIL', 'Leather, rubber', '$160', '2015-06-27 00:00:00', '555088-005', 'https://images.stockx.com/images/Air-Jordan-1-Retro-Shattered-Backboard-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1614262955'),
(37, 'Balenciaga Political campaign hoodie (Bernie)', 'This unisex hoodie by Balenciaga features a front pocket, hood and political artwork printed at the chest and back. Made in Portugal.', '', 21, '2022-05-15 22:17:36', 1, 'Balenciaga', 'Black', '100% Cotton', '850€', '2017-10-15 00:00:00', '600583TIV531070', 'https://image.harrods.com/17/45/47/43/17454743_36077178_2048.jpg'),
(38, 'Nike Air Force 1 Low \'07', 'The Nike Air Force 1 Low White ‘07 features an all-white leather upper with a perforated toe box and Swoosh overlays. A Nike heel embroidery and white sole completes the design.\n\nThe Nike Air Force 1 Low White ‘07 originally released in 2007, but since it is an essential colorway to the brand, it consistently restocks.', '', 21, '2022-05-15 22:27:02', 1, 'Nike', 'WHITE/WHITE', 'Leather, rubber, synthetic textile', '$90', '2007-11-24 00:00:00', '315122-111/CW2288-111', 'https://images.stockx.com/images/Nike-Air-Force-1-Low-White-07_V2-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1631122839'),
(39, 'Nike Air Max 90 NRG Bacon 2021', 'The Nike Air Max 90 Bacon is still one of the most highly sought-after Air Max runners of all time. So much so that Nike brought back the 2004 design to celebrate Air Max Day in 2021. It is not often that Nike retros collaborations, while most rarely resurface. But with its continuously growing fan base and pleas from Air Max fans to revive the 16-year-old colorway, Nike brought back the sneaker in its OG form.\n', '', 21, '2022-05-15 22:29:45', 1, 'Nike', 'SAIL-SHEEN-STRAW-MEDIUM BROWN', 'Leather, suede, rubber, synthetic textile', '$140', '2021-03-26 00:00:00', 'CU1816-100', 'https://images.stockx.com/images/Nike-Air-Max-90-NRG-Bacon-2021-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1616604639'),
(40, 'Dior B23 High Oblique', 'The B23 high-top sneaker is set apart by its white and black Dior Oblique motif and transparent paneling. Essential details, such as eyelets and a lace-up front, a white and beige rubber sole, a rounded and reinforced toe as well as a back tab recall the codes of the classic high-top style. The sneaker is further enhanced with contrasting details on the sides, including a \'DIOR\' signature, and pairs easily with any casual outfit.', '', 21, '2022-05-15 22:33:16', 1, 'Dior', 'OBLIQUE', 'Polyester, synthetic textile, leather, rubber, microfiber', '$1,050', '2019-04-05 00:00:00', '3SH118YJPT00480H069', 'https://images.stockx.com/images/Dior-B23-High-Top-Logo-Oblique-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1613339404'),
(41, 'Jordan 1 High Neutral Grey 85', 'To kick off the second month of 2021, Jordan Brand set the tone for the best release of the year the Air Jordan 1 ‘85 Neutral Grey. The OG sneaker returned in 2021 for the first time since its 1985 release, and Jordan Brand didn’t hold back on its details.', 'The Air Jordan 1 ‘85 Neutral Grey features noticeable differences from other Jordan 1 High retros. The biggest difference is the Neutral Grey’s shape, as the slightly curved heel that has been standard since 2015’s Chicago 1s, is subbed with a straighter cut. From there, the “Wings” logo on the coll', 21, '2022-05-15 22:35:26', 1, 'Air Jordan, Nike', 'WHITE/NEUTRAL GREY', 'Leather, rubber, synthetic textile', '$200', '2021-02-10 00:00:00', 'BQ4422-100', 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-85-Neutral-Grey-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1612902573'),
(42, 'GOLF Le Fleur Lacoste Teddy Jacket', 'The Lacoste x GOLF le FLEUR collection intersects vintage sportswear and contemporary streetstyle in a flurry of vibrant colour and pared back cuts. This varsity-influenced jacket is presented in vivid pine green and crafted from a wool-rich mix with soft cream leather sleeves. Typical features of the Teddy jacket follow – ribbed striped trims, shearling-look brand patches at the chest and back – and the look is completed with a marshmallow-tone satin lining.', '', 21, '2022-05-15 22:42:03', 1, 'GOLF le Fleur, Lacoste', 'GREEN', 'Wool, polyester, viscose, leather', '$650', '2019-07-17 00:00:00', 'N/A', 'https://images.stockx.com/images/GOLF-Le-Fleur-Lacoste-Teddy-Jacket-Green.png?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=2&trim=color&updated_at=1618618542&q=75'),
(43, 'Nike Dunk Low Coconut Milk', 'The Nike Dunk Low Coconut Milk features an off-white tumbled leather upper with pale yellow overlays and white Swooshes. Woven tongue labels and heel embroideries nod to the original 1985 design. From there, a matching Air sole at the base completes the design.', '', 21, '2022-05-15 22:44:22', 1, 'Nike', 'COCONUT MILK/WHITE-SAIL', 'Leather, synthetic textile, rubber', '$100', '2022-03-01 00:00:00', 'DJ6188-100', 'https://images.stockx.com/images/Nike-Dunk-Low-Coconut-Milk-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1651696484'),
(44, 'Jordan 5 Jade Horizon', 'The Air Jordan 5 Jade Horizon features a Jade Horizon leather upper with seemingly oxidized TPU netted inserts, eyestays, and lace-locks for a broken-in look. A black midsole with Cement shark-teeth detailing pays homage to the original Air Jordan 5 Metallic. Although this Jordan 5 is brand new, it ditches the icy, semi-translucent outsole most new Jordan 5s come equipped with for a yellowed one, emphasizing the aged aesthetic.', '', 21, '2022-05-15 22:47:37', 1, 'Air Jordan, Nike', 'JADE HORIZON/LIGHT SILVER-ANTHRACITE-PINK GLAZE', 'Leather, synthetic textile, rubber', '$190', '2022-04-09 00:00:00', ' DC7501-300', 'https://images.stockx.com/images/Air-Jordan-5-Retro-Jade-Horizon-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1649685026'),
(46, 'Gallery Dept. French T-Shirt', 'Gallery Dept t-shirt featuring a yellow french logo in the front and back. ', 'Please Note: This product may have wrinkles, scars, scratches that are inherent characteristics and natural beauty of this material. This results differences and uniqueness to each piece.', 22, '2022-05-15 23:02:29', 0, 'Gallery Dept.', 'BLACK', 'Cotton', '$168', '2021-06-07 00:00:00', ' GD-FT-1000', 'https://images.stockx.com/images/Gallery-Dept-French-T-Shirt-Black.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1631522132'),
(47, 'Test test', 'Test test', 'Test test', 22, '2022-05-15 23:02:49', 0, 'Test test', 'Test test', 'Test test', 'Test test', '1111-11-11 00:00:00', 'Test test', 'Test test');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(150) CHARACTER SET utf8 NOT NULL,
  `Email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Role` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Name`, `Password`, `Email`, `Role`) VALUES
(21, 'kanyewest', '$2a$11$LQw0QXXLN95WQd2tK0pTI.wGlXarf4x8Ye7aepU19/Tcrsdrtsmei', 'kanye@west.com', 1),
(22, 'mangirdas', '$2a$11$/jV0rrQo/ABAuAwBpxcfIOafkqcdm/U.4lEMRadx2SlHxPTqt3gfG', 'mangirdas@mangirdas.com', 0),
(26, 'Naudotojas1', '$2a$11$dQmOkMaEdOL62Ry8mjQMu.YrV9BmphXmeX2VbLLO2rftxmbMDGepK', 'Naudotojas1@mail.com', 1),
(29, 'Naudotojas2', '$2a$11$Rg5uAdQTG5biKnnR6if.gObxTsMPLsAp6fHH9VZZDqHtGtbQcsla6', 'Naudotojas2@mail.com', 0),
(30, 'Naudotojas3', '$2a$11$vkUQitk3mKEut80VVp6zr.Dvz7UM6WSNd1iJHND7/omoRRZhurivO', 'Naudotojas3@mail.com', 0),
(31, 'Naudotojas4', '$2a$11$vieiJRbGPYDRRcXWASeTy.MVb7iib.muWRE0Ejayc24.rdvi1GOTu', 'Naudotojas4@mail.com', 0),
(34, 'Naudotojas5', '$2a$11$VA75YKAFD7Waa92XL4ehgeWyF4vNhnOj1oAI.xO/.LiFCGK5t/xM6', 'Naudotojas5@mail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20220311162852_DBInit', '5.0.15'),
('20220312151911_DBInit2', '5.0.15'),
('20220402083822_Userfix', '5.0.15'),
('20220419094152_Post', '5.0.15'),
('20220427191710_PostUpdate', '5.0.15'),
('20220503160541_Image', '5.0.15'),
('20220507184102_AgeRemoval', '5.0.15'),
('20220507193547_PriceBrand', '5.0.15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_user` (`FK_User`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`FK_User`) REFERENCES `user` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
