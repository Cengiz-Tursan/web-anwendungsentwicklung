-- MySQL initialization script for schema "cookbook"
-- run this after structure definition
-- best import using client command "source <path to this file>"
SET CHARACTER SET utf8mb4;
USE cookbook;
DELETE FROM AbstractEntity WHERE identity <> 1;


-- insertion of some people
INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p01 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p01, NULL, "guest@cookbook.de", SHA2("guest",256), "DIVERSE", "USER", NULL, "Guest", "Any", "10557", "Spreeweg 1", "Berlin", "Deutschland");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p02 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p02, NULL, "ines.bergfrau@web.de", SHA2("ines",256), "FEMALE", "ADMIN", "Doktor", "Bergfrau", "Ines", "10999", "Wiener Strasse 42", "Berlin", "Deutschland");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p03 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p03, NULL, "sascha.baumeister@gmail.com", SHA2("sascha",256), "MALE", "USER", NULL, "Baumeister", "Sascha", "10243", "Hildegard-Jadamowitz-Strasse 22", "Berlin", "Deutschland");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p04 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p04, NULL, "elias.schmidt@mail.com", SHA2("elias",256), "MALE", "USER", NULL, "Schmidt", "Elias", "06712", "Am Erker 3", "Breitenbach", "Germany");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p05 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p05, NULL, "julia.fischer@web.de", SHA2("julia",256), "FEMALE", "USER", NULL, "Fischer", "Julia", "80115", "Marktstraße 211", "München", "Germany");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p06 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p06, NULL, "lea.wagner@gmail.de", SHA2("lea",256), "FEMALE", "USER", NULL, "Wagner", "Lea", "26717", "Falkensteinstraße 17", "Bremen", "Germany");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p07 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p07, NULL, "linus.schroeder-koenig@web.de", SHA2("linus",256), "MALE", "USER", NULL, "Schröder-König", "Linus", "54497", "Hauptstraße 25", "Horath", "Germany");

INSERT INTO AbstractEntity VALUES (0, "Person", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @p08 = LAST_INSERT_ID();
INSERT INTO Person VALUES (@p08, NULL, "zeta.mondo@nsa.gov", SHA2("zeta",256), "FEMALE", "USER", "Agent", "Mondo", "Zeta", "10990", "Am Brackwasser 7", "Berlin", "Germany");


-- insertion of an access plan
INSERT INTO AbstractEntity VALUES (0, "AccessPlan", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @a01 = LAST_INSERT_ID();
INSERT INTO AccessPlan VALUES (@a01, @p02, "Cookbook-App", SHA2(CONCAT(@p02, "|", "Cookbook-App"),256), "OMEGA");


-- insertion of some victuals
INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v01 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v01, NULL, NULL, "VEGAN", "Wasser", "Diwasserstoffoxid (H2O)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v02 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v02, NULL, NULL, "VEGAN", "Kochsalz", "Natriumchlorid (NaCl)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v03 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v03, NULL, NULL, "VEGAN", "Pfeffer (Pulver)", "Gemahlener Pfeffer");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v04 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v04, NULL, NULL, "VEGAN", "Pfeffer (Schrot)", "Geschroteter Pfeffer");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v05 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v05, NULL, NULL, "VEGAN", "Pfeffer (Koerner)", "Gekoernter Pfeffer");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v06 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v06, NULL, NULL, "VEGAN", "Chili (Pulver)", "Chilipulver");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v07 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v07, NULL, NULL, "VEGAN", "Paprika (Pulver)", "Paprikapulver");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v08 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v08, NULL, NULL, "VEGAN", "Curry (Pulver)", "Currypulver aus Kurkuma, Chili, Koriander, Kreuzkuemmel, Bockshornklee, Senfkoernern und schwarzem Pfeffer");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v09 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v09, NULL, @p01, "VEGAN", "Muskat (Nuss)", "Muskatnuss");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v10 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v10, NULL, @p01, "VEGAN", "Muskat (Pulver)", "Muskatpulver");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v11 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v11, NULL, @p02, "VEGAN", "Oregano (getrocknet)", "Oreganoblaetter (trocken)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v12 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v12, NULL, @p02, "VEGAN", "Oregano (frisch)", "Oreganoblaetter (frisch)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v13 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v13, NULL, @p03, "LACTO_OVO_VEGETARIAN", "Ei", "Huehnerei");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v14 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v14, NULL, @p03, "CARNIVORIAN", "Hackfleisch (gemischt)", "Rinder- und Schweinehackfleisch gemischt");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v15 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v15, NULL, @p03, "CARNIVORIAN", "Hackfleisch (Rind)", "Rinderhackfleisch");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v16 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v16, NULL, @p03, "CARNIVORIAN", "Hackfleisch (Schwein)", "Schweinehackfleisch");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v17 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v17, NULL, @p03, "VEGAN", "Pasta (Spaghetti)", "Spaghetti-Nudel");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v18 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v18, NULL, @p03, "VEGAN", "Pasta (Linguine)", "Schmalband-Nudel (Linguine)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v19 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v19, NULL, @p03, "VEGAN", "Pasta (Band)", "Bandnudel (Fettuccine, Pappardine, ...)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v20 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v20, NULL, @p03, "VEGAN", "Pasta (Rigatoni)", "Roehren-Nudel (Rigatoni)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v21 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v21, NULL, @p03, "VEGAN", "Pasta (Penne)", "Roehren-Nudel (Penne)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v22 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v22, NULL, @p03, "LACTO_OVO_VEGETARIAN", "Pasta (Horn)", "Hoernchen-Nudel");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v23 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v23, NULL, @p03, "VEGAN", "Pasta (Spirale)", "Spiral-Nudel (Spirelli)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v24 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v24, NULL, @p03, "VEGAN", "Pasta (Farfale)", "Schmetterlings-Nudel (Farfale)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v25 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v25, NULL, @p03, "LACTO_VEGETARIAN", "Pasta (Tortellini)", "Nudel-Tasche (Tortellini)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v26 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v26, NULL, @p03, "LACTO_OVO_VEGETARIAN", "Pasta (Spaetzle geschabt)", "Schwaebische geschabte Spaetzle");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v27 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v27, NULL, @p03, "LACTO_OVO_VEGETARIAN", "Pasta (Spaetzle gepresst)", "Schwaebische gepresste Spaetzle");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v28 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v28, NULL, @p03, "LACTO_OVO_VEGETARIAN", "Pasta (Spaetzle gehobelt)", "Schwaebische gehobelte Spaetzle");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v29 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v29, NULL, @p03, "CARNIVORIAN", "Pasta (Maultasche)", "Schwaebische Maultasche (Maulschelle, Laubfrosch)");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v30 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v30, NULL, @p02, "VEGAN", "Tomate (Passiert)", "Passierte Tomate");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v31 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v31, NULL, @p02, "VEGAN", "Tomatenmark (2-fach)", "2-fach  konzentriertes Tomatenmark");

INSERT INTO AbstractEntity VALUES (0, "Victual", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @v32 = LAST_INSERT_ID();
INSERT INTO Victual VALUES (@v32, NULL, @p02, "VEGAN", "Tomatenmark (3-fach)", "3-fach  konzentriertes Tomatenmark");


-- insertion of some recipes
INSERT INTO AbstractEntity VALUES (0, "Recipe", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @r01 = LAST_INSERT_ID();
INSERT INTO Recipe VALUES (@r01, NULL, NULL, "MAIN_COURSE", "Spaghetti Bolognese", "Spaghetti mit Hackfleischsosse", "Spaghetti ca. 8-10min in Salzwasser kochen bis sie al-dente sind. Hackfleisch zusammen mit den gehackten Zwiebeln anbraten, Gewuerze, Tomatenmark sowie passierte Tomaten zugeben, alles gut vermengen, danach abschmecken.");


-- insertion of some ingredients
INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i01 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i01, @r01, @v01, 3.0, "LITRE");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i02 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i02, @r01, @v17, 250, "GRAM");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i03 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i03, @r01, @v14, 250, "GRAM");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i04 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i04, @r01, @v30, 0.5, "LITRE");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i05 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i05, @r01, @v32, 250, "GRAM");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i06 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i06, @r01, @v02, 1, "TABLESPOON");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i07 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i07, @r01, @v03, 1, "TEASPOON");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i08 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i08, @r01, @v06, 1, "TEASPOON");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i09 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i09, @r01, @v07, 2, "TEASPOON");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i10 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i10, @r01, @v10, 2, "PINCH");

INSERT INTO AbstractEntity VALUES (0, "Ingredient", 1, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000);
SET @i11 = LAST_INSERT_ID();
INSERT INTO Ingredient VALUES (@i11, @r01, @v11, 1, "TABLESPOON");


-- display content of table AbstractEntity
SELECT * FROM AbstractEntity;
