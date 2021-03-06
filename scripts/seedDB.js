const mongoose = require('mongoose');
const Item = require('../models/item');

// This file empties the Items collection and inserts the items below
const seedDB = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/fakazondb");

    const itemSeed = [{ "serial_number": "862-08-7925", "product_name": "Syrup - Pancake", "price": "$772.66", "manufacturer": "Boyle, Bechtelar and Lindgren", "category": "Automotive", "quantity": 78 },
    { "serial_number": "528-03-9903", "product_name": "Truffle Cups - Red", "price": "$904.07", "manufacturer": "Champlin Group", "category": "Music", "quantity": 61 },
    { "serial_number": "834-49-1300", "product_name": "Lemonade - Natural, 591 Ml", "price": "$430.63", "manufacturer": "Bruen and Sons", "category": "Electronics", "quantity": 16 },
    { "serial_number": "839-60-4013", "product_name": "Sugar - Icing", "price": "$836.61", "manufacturer": "Daniel-Kuhn", "category": "Clothing", "quantity": 2 },
    { "serial_number": "552-69-5752", "product_name": "Zucchini - Mini, Green", "price": "$945.28", "manufacturer": "Rutherford Group", "category": "Movies", "quantity": 53 },
    { "serial_number": "713-24-8248", "product_name": "Quail - Jumbo Boneless", "price": "$106.82", "manufacturer": "Reichel Group", "category": "Beauty", "quantity": 73 },
    { "serial_number": "745-16-8475", "product_name": "Gloves - Goldtouch Disposable", "price": "$765.49", "manufacturer": "Pagac, Ratke and Anderson", "category": "Shoes", "quantity": 38 },
    { "serial_number": "267-11-8838", "product_name": "Milk - 2% 250 Ml", "price": "$25.18", "manufacturer": "Bogisich, Carroll and McClure", "category": "Health", "quantity": 26 },
    { "serial_number": "752-27-6126", "product_name": "Garbag Bags - Black", "price": "$177.52", "manufacturer": "Marquardt-Schinner", "category": "Tools", "quantity": 28 },
    { "serial_number": "814-83-7628", "product_name": "Wine - Conde De Valdemar", "price": "$729.55", "manufacturer": "Kassulke, Jerde and Satterfield", "category": "Games", "quantity": 94 },
    { "serial_number": "749-15-1883", "product_name": "Bread - Burger", "price": "$941.86", "manufacturer": "Schamberger, Sawayn and Gerhold", "category": "Computers", "quantity": 12 },
    { "serial_number": "521-24-8371", "product_name": "Capon - Breast, Wing On", "price": "$399.59", "manufacturer": "Rippin Group", "category": "Sports", "quantity": 81 },
    { "serial_number": "744-09-4510", "product_name": "Lambcasing", "price": "$692.91", "manufacturer": "Moen Inc", "category": "Clothing", "quantity": 62 },
    { "serial_number": "636-19-1967", "product_name": "Godiva White Chocolate", "price": "$78.07", "manufacturer": "Paucek, Kuphal and Ratke", "category": "Movies", "quantity": 27 },
    { "serial_number": "187-06-9792", "product_name": "Eggplant - Regular", "price": "$936.11", "manufacturer": "Schaefer-Bins", "category": "Clothing", "quantity": 7 },
    { "serial_number": "508-26-5539", "product_name": "Cheese - Goat", "price": "$622.46", "manufacturer": "Ledner-Kunze", "category": "Health", "quantity": 64 },
    { "serial_number": "278-05-3757", "product_name": "Propel Sport Drink", "price": "$641.08", "manufacturer": "Keebler-Strosin", "category": "Outdoors", "quantity": 12 },
    { "serial_number": "776-98-0570", "product_name": "Amarula Cream", "price": "$780.24", "manufacturer": "Steuber, Beier and Walter", "category": "Home", "quantity": 17 },
    { "serial_number": "340-90-0632", "product_name": "Muffin Hinge 117n", "price": "$733.16", "manufacturer": "Nicolas-Keeling", "category": "Health", "quantity": 80 },
    { "serial_number": "816-13-9717", "product_name": "Wine - Taylors Reserve", "price": "$123.82", "manufacturer": "Brown, Maggio and Runolfsson", "category": "Garden", "quantity": 9 },
    { "serial_number": "692-56-8137", "product_name": "Macaroons - Homestyle Two Bit", "price": "$120.79", "manufacturer": "Zulauf, Denesik and Cronin", "category": "Industrial", "quantity": 6 },
    { "serial_number": "211-07-3738", "product_name": "Asparagus - White, Fresh", "price": "$158.83", "manufacturer": "Stamm, McDermott and O'Reilly", "category": "Jewelery", "quantity": 86 },
    { "serial_number": "288-96-0689", "product_name": "Pork Loin Bine - In Frenched", "price": "$881.62", "manufacturer": "Goldner, Swaniawski and Koepp", "category": "Toys", "quantity": 37 },
    { "serial_number": "266-12-5359", "product_name": "Venison - Racks Frenched", "price": "$272.68", "manufacturer": "Kreiger-Wiegand", "category": "Automotive", "quantity": 4 },
    { "serial_number": "504-36-0866", "product_name": "Onions - Pearl", "price": "$581.26", "manufacturer": "Ryan-Kemmer", "category": "Music", "quantity": 80 },
    { "serial_number": "413-84-9752", "product_name": "Cod - Black Whole Fillet", "price": "$6.59", "manufacturer": "Huel Group", "category": "Garden", "quantity": 27 },
    { "serial_number": "263-64-0260", "product_name": "Nestea - Iced Tea", "price": "$377.64", "manufacturer": "Mohr-Herzog", "category": "Sports", "quantity": 36 },
    { "serial_number": "520-07-8893", "product_name": "Oyster - In Shell", "price": "$59.56", "manufacturer": "Boehm, Welch and Jaskolski", "category": "Books", "quantity": 95 },
    { "serial_number": "276-63-9244", "product_name": "Veal - Kidney", "price": "$869.90", "manufacturer": "Herzog Group", "category": "Tools", "quantity": 62 },
    { "serial_number": "767-38-4947", "product_name": "Apple - Custard", "price": "$86.47", "manufacturer": "Daugherty-Funk", "category": "Tools", "quantity": 100 },
    { "serial_number": "504-12-9555", "product_name": "Beans - Black Bean, Dry", "price": "$952.45", "manufacturer": "Walker, Zulauf and Jenkins", "category": "Baby", "quantity": 86 },
    { "serial_number": "840-27-2869", "product_name": "Venison - Ground", "price": "$331.29", "manufacturer": "Lind-Hickle", "category": "Computers", "quantity": 53 },
    { "serial_number": "177-91-5813", "product_name": "Carrots - Purple, Organic", "price": "$695.23", "manufacturer": "Corkery-Ziemann", "category": "Health", "quantity": 42 },
    { "serial_number": "257-10-7275", "product_name": "Wine - Chablis J Moreau Et Fils", "price": "$132.35", "manufacturer": "Tillman-Langworth", "category": "Clothing", "quantity": 71 },
    { "serial_number": "883-49-7770", "product_name": "Squid - Breaded", "price": "$43.46", "manufacturer": "Hamill-Greenholt", "category": "Garden", "quantity": 32 },
    { "serial_number": "872-39-9094", "product_name": "Peach - Fresh", "price": "$796.91", "manufacturer": "Rice LLC", "category": "Industrial", "quantity": 83 },
    { "serial_number": "458-96-4692", "product_name": "Carbonated Water - Blackberry", "price": "$661.15", "manufacturer": "Yost-Fadel", "category": "Electronics", "quantity": 99 },
    { "serial_number": "333-86-6773", "product_name": "Hog / Sausage Casing - Pork", "price": "$810.02", "manufacturer": "Wunsch-Rosenbaum", "category": "Music", "quantity": 22 },
    { "serial_number": "218-62-4537", "product_name": "Plasticknivesblack", "price": "$799.06", "manufacturer": "Bartoletti Inc", "category": "Shoes", "quantity": 98 },
    { "serial_number": "112-07-2003", "product_name": "Wine - White, French Cross", "price": "$182.27", "manufacturer": "Renner and Sons", "category": "Automotive", "quantity": 63 },
    { "serial_number": "484-24-7887", "product_name": "Wine - Marlbourough Sauv Blanc", "price": "$158.76", "manufacturer": "Toy, Kilback and Bernhard", "category": "Games", "quantity": 48 },
    { "serial_number": "628-36-3615", "product_name": "Bread Fig And Almond", "price": "$839.75", "manufacturer": "Ondricka-Krajcik", "category": "Tools", "quantity": 36 },
    { "serial_number": "144-28-7289", "product_name": "Tea - Orange Pekoe", "price": "$706.82", "manufacturer": "Conn-Glover", "category": "Kids", "quantity": 6 },
    { "serial_number": "293-99-1597", "product_name": "Chickensplit Half", "price": "$131.60", "manufacturer": "Considine, West and Franecki", "category": "Grocery", "quantity": 88 },
    { "serial_number": "365-29-9229", "product_name": "Hot Chocolate - Individual", "price": "$300.45", "manufacturer": "Hilll, Mohr and Marvin", "category": "Sports", "quantity": 6 },
    { "serial_number": "433-50-6866", "product_name": "Lamb Rack Frenched Australian", "price": "$552.19", "manufacturer": "Stokes, Wiegand and Spinka", "category": "Games", "quantity": 54 },
    { "serial_number": "548-15-2168", "product_name": "Mushroom - Shitake, Fresh", "price": "$925.42", "manufacturer": "Abernathy, Hilpert and Boyer", "category": "Grocery", "quantity": 34 },
    { "serial_number": "602-68-3592", "product_name": "Oven Mitt - 13 Inch", "price": "$89.33", "manufacturer": "Okuneva, Deckow and Bergstrom", "category": "Baby", "quantity": 96 },
    { "serial_number": "273-71-2947", "product_name": "Scallops - In Shell", "price": "$614.40", "manufacturer": "Casper, Nienow and Glover", "category": "Outdoors", "quantity": 94 },
    { "serial_number": "432-47-7869", "product_name": "Garlic - Primerba, Paste", "price": "$671.61", "manufacturer": "Fay, Pfeffer and Greenfelder", "category": "Music", "quantity": 3 },
    { "serial_number": "892-08-0782", "product_name": "Steam Pan Full Lid", "price": "$467.82", "manufacturer": "O'Kon, Dach and Nienow", "category": "Electronics", "quantity": 10 },
    { "serial_number": "112-37-3934", "product_name": "Vodka - Smirnoff", "price": "$52.32", "manufacturer": "Corwin, Zulauf and Monahan", "category": "Books", "quantity": 94 },
    { "serial_number": "393-99-2492", "product_name": "Sprouts - China Rose", "price": "$814.07", "manufacturer": "Hayes, Schowalter and Streich", "category": "Jewelery", "quantity": 30 },
    { "serial_number": "209-10-1795", "product_name": "Shrimp - 21/25, Peel And Deviened", "price": "$325.95", "manufacturer": "Shanahan-Morissette", "category": "Tools", "quantity": 40 },
    { "serial_number": "308-81-7343", "product_name": "Island Oasis - Lemonade", "price": "$235.22", "manufacturer": "Rosenbaum, Smith and Konopelski", "category": "Home", "quantity": 17 },
    { "serial_number": "635-02-9962", "product_name": "Goldschalger", "price": "$38.65", "manufacturer": "Botsford, Stroman and Gislason", "category": "Health", "quantity": 39 },
    { "serial_number": "500-56-5922", "product_name": "Blueberries - Frozen", "price": "$727.55", "manufacturer": "Haley-Crona", "category": "Baby", "quantity": 29 },
    { "serial_number": "807-98-2518", "product_name": "Pasta - Canelloni, Single Serve", "price": "$815.52", "manufacturer": "Swaniawski, Jacobs and Stehr", "category": "Home", "quantity": 44 },
    { "serial_number": "877-50-5282", "product_name": "Wine - Gato Negro Cabernet", "price": "$65.16", "manufacturer": "Hammes Inc", "category": "Health", "quantity": 86 },
    { "serial_number": "767-67-7520", "product_name": "Lamb - Shanks", "price": "$541.27", "manufacturer": "Huels-Eichmann", "category": "Clothing", "quantity": 93 },
    { "serial_number": "565-59-3055", "product_name": "Magnotta Bel Paese Red", "price": "$800.39", "manufacturer": "Fahey-Schiller", "category": "Grocery", "quantity": 84 },
    { "serial_number": "376-20-7351", "product_name": "Ginger - Crystalized", "price": "$441.14", "manufacturer": "Tromp-Witting", "category": "Toys", "quantity": 75 },
    { "serial_number": "506-73-0522", "product_name": "Wine - Peller Estates Late", "price": "$781.30", "manufacturer": "Bayer-Jast", "category": "Movies", "quantity": 33 },
    { "serial_number": "832-28-6531", "product_name": "Assorted Desserts", "price": "$53.54", "manufacturer": "Hoeger-Feeney", "category": "Kids", "quantity": 25 },
    { "serial_number": "662-52-8500", "product_name": "Pie Box - Cello Window 2.5", "price": "$733.54", "manufacturer": "Watsica and Sons", "category": "Electronics", "quantity": 95 },
    { "serial_number": "568-93-8314", "product_name": "Pepper - Orange", "price": "$808.40", "manufacturer": "Hansen, Parisian and Bahringer", "category": "Games", "quantity": 42 },
    { "serial_number": "575-05-5539", "product_name": "Broccoli - Fresh", "price": "$20.11", "manufacturer": "Bergstrom Group", "category": "Health", "quantity": 4 },
    { "serial_number": "828-72-2792", "product_name": "Napkin - Beverage 1 Ply", "price": "$242.37", "manufacturer": "Nolan, Wunsch and Lind", "category": "Kids", "quantity": 63 },
    { "serial_number": "829-44-8633", "product_name": "Butter - Salted", "price": "$799.29", "manufacturer": "Krajcik and Sons", "category": "Health", "quantity": 11 },
    { "serial_number": "526-35-8394", "product_name": "Bagel - Everything", "price": "$663.39", "manufacturer": "DuBuque, Kris and Vandervort", "category": "Outdoors", "quantity": 65 },
    { "serial_number": "113-17-2851", "product_name": "Muffin Mix - Banana Nut", "price": "$340.29", "manufacturer": "Runolfsson Group", "category": "Health", "quantity": 51 },
    { "serial_number": "150-66-1845", "product_name": "Soup - Knorr, Ministrone", "price": "$755.34", "manufacturer": "Stiedemann Group", "category": "Garden", "quantity": 65 },
    { "serial_number": "338-58-1063", "product_name": "Pineapple - Regular", "price": "$155.58", "manufacturer": "Emard LLC", "category": "Kids", "quantity": 98 },
    { "serial_number": "248-68-0002", "product_name": "Cut Wakame - Hanawakaba", "price": "$118.00", "manufacturer": "Schiller and Sons", "category": "Clothing", "quantity": 79 },
    { "serial_number": "514-67-5929", "product_name": "Gelatine Powder", "price": "$207.95", "manufacturer": "Gaylord-Lind", "category": "Tools", "quantity": 7 },
    { "serial_number": "298-65-4816", "product_name": "Juice - Tomato, 48 Oz", "price": "$624.71", "manufacturer": "Hettinger Inc", "category": "Industrial", "quantity": 30 },
    { "serial_number": "446-53-9528", "product_name": "Beer - True North Strong Ale", "price": "$962.01", "manufacturer": "Becker-Luettgen", "category": "Movies", "quantity": 37 },
    { "serial_number": "897-88-0112", "product_name": "Bacardi Raspberry", "price": "$34.21", "manufacturer": "Ward, Kulas and Bernhard", "category": "Jewelery", "quantity": 98 },
    { "serial_number": "609-23-0367", "product_name": "Pork - Tenderloin, Frozen", "price": "$172.82", "manufacturer": "Kshlerin, Bogisich and Doyle", "category": "Books", "quantity": 68 },
    { "serial_number": "649-29-4277", "product_name": "Juice - Grapefruit, 341 Ml", "price": "$103.66", "manufacturer": "Reichert-Simonis", "category": "Music", "quantity": 38 },
    { "serial_number": "253-67-8063", "product_name": "Fib N9 - Prague Powder", "price": "$430.44", "manufacturer": "Lowe-Schaefer", "category": "Home", "quantity": 35 },
    { "serial_number": "246-43-9088", "product_name": "Caviar - Salmon", "price": "$367.47", "manufacturer": "Kerluke, Walker and Zemlak", "category": "Home", "quantity": 64 },
    { "serial_number": "443-78-1634", "product_name": "V8 Splash Strawberry Banana", "price": "$371.73", "manufacturer": "Kessler-Jenkins", "category": "Jewelery", "quantity": 31 },
    { "serial_number": "248-14-4916", "product_name": "Pepper - Roasted Red", "price": "$51.60", "manufacturer": "Pollich, Lakin and Harvey", "category": "Home", "quantity": 56 },
    { "serial_number": "558-89-6118", "product_name": "Cake Circle, Paprus", "price": "$46.89", "manufacturer": "O'Connell Group", "category": "Kids", "quantity": 45 },
    { "serial_number": "744-73-0203", "product_name": "Eggplant - Baby", "price": "$146.57", "manufacturer": "Reichert, Kuhic and McLaughlin", "category": "Kids", "quantity": 71 },
    { "serial_number": "192-72-3896", "product_name": "Soup - Knorr, French Onion", "price": "$519.77", "manufacturer": "Senger Group", "category": "Kids", "quantity": 63 },
    { "serial_number": "402-75-4918", "product_name": "Crab - Meat Combo", "price": "$837.70", "manufacturer": "Hoppe, Doyle and Lindgren", "category": "Industrial", "quantity": 24 },
    { "serial_number": "749-86-2862", "product_name": "Pastry - Cheese Baked Scones", "price": "$187.98", "manufacturer": "McDermott, Gleason and Schumm", "category": "Health", "quantity": 36 },
    { "serial_number": "513-77-6764", "product_name": "Soup - Clam Chowder, Dry Mix", "price": "$554.63", "manufacturer": "Connelly, Friesen and Lowe", "category": "Home", "quantity": 63 },
    { "serial_number": "320-06-8219", "product_name": "Pate - Cognac", "price": "$947.86", "manufacturer": "Parker Group", "category": "Tools", "quantity": 35 },
    { "serial_number": "661-28-5740", "product_name": "Silicone Paper 16.5x24", "price": "$123.94", "manufacturer": "Reynolds Group", "category": "Games", "quantity": 94 },
    { "serial_number": "188-62-7925", "product_name": "Bread - Rye", "price": "$824.75", "manufacturer": "Wunsch, Schroeder and Murray", "category": "Baby", "quantity": 61 },
    { "serial_number": "693-27-7456", "product_name": "Pumpkin", "price": "$531.91", "manufacturer": "Haley, Dickinson and Medhurst", "category": "Music", "quantity": 72 },
    { "serial_number": "172-98-6041", "product_name": "Tart Shells - Sweet, 3", "price": "$154.54", "manufacturer": "Wisozk, Collins and Graham", "category": "Baby", "quantity": 64 },
    { "serial_number": "454-96-6253", "product_name": "Juice - Prune", "price": "$587.32", "manufacturer": "Schiller Inc", "category": "Kids", "quantity": 94 },
    { "serial_number": "309-08-5117", "product_name": "Dried Cherries", "price": "$465.53", "manufacturer": "Schuppe LLC", "category": "Sports", "quantity": 8 },
    { "serial_number": "634-53-9202", "product_name": "Flour - Buckwheat, Dark", "price": "$140.45", "manufacturer": "Trantow, Schoen and Jacobs", "category": "Jewelery", "quantity": 80 },
    { "serial_number": "561-54-7661", "product_name": "Compound - Mocha", "price": "$197.80", "manufacturer": "Emmerich-Bins", "category": "Music", "quantity": 40 },
    { "serial_number": "582-84-3084", "product_name": "Puree - Pear", "price": "$739.01", "manufacturer": "Walker-Ernser", "category": "Baby", "quantity": 29 },
    { "serial_number": "272-17-0007", "product_name": "Syrup - Golden, Lyles", "price": "$789.06", "manufacturer": "Schamberger-Rice", "category": "Sports", "quantity": 36 },
    { "serial_number": "764-64-9487", "product_name": "Juice - Clamato, 341 Ml", "price": "$377.15", "manufacturer": "Batz Inc", "category": "Computers", "quantity": 24 },
    { "serial_number": "722-86-4455", "product_name": "Scallops - In Shell", "price": "$739.88", "manufacturer": "Skiles, Kub and Rice", "category": "Games", "quantity": 39 },
    { "serial_number": "246-19-6298", "product_name": "Doilies - 8, Paper", "price": "$387.85", "manufacturer": "Wunsch, Cummerata and Pagac", "category": "Baby", "quantity": 41 },
    { "serial_number": "155-54-7955", "product_name": "Wine - Red, Pelee Island Merlot", "price": "$799.16", "manufacturer": "Mann-Skiles", "category": "Books", "quantity": 55 },
    { "serial_number": "638-35-3767", "product_name": "Table Cloth 62x120 White", "price": "$727.87", "manufacturer": "Kassulke, Gusikowski and Thompson", "category": "Electronics", "quantity": 86 },
    { "serial_number": "627-73-3136", "product_name": "Langers - Mango Nectar", "price": "$171.77", "manufacturer": "Lowe Group", "category": "Baby", "quantity": 73 },
    { "serial_number": "214-89-3682", "product_name": "Onions - Pearl", "price": "$371.04", "manufacturer": "McCullough Group", "category": "Kids", "quantity": 25 },
    { "serial_number": "364-62-1135", "product_name": "Mix - Cocktail Ice Cream", "price": "$200.11", "manufacturer": "Sawayn, Franecki and Upton", "category": "Jewelery", "quantity": 77 },
    { "serial_number": "156-11-2412", "product_name": "Beans - Navy, Dry", "price": "$608.79", "manufacturer": "King-Ward", "category": "Electronics", "quantity": 73 },
    { "serial_number": "284-21-0420", "product_name": "Milk - Homo", "price": "$42.13", "manufacturer": "Dicki and Sons", "category": "Books", "quantity": 95 },
    { "serial_number": "547-73-3636", "product_name": "Cheese - Fontina", "price": "$997.73", "manufacturer": "Kemmer Group", "category": "Tools", "quantity": 21 },
    { "serial_number": "522-28-4038", "product_name": "Roe - Flying Fish", "price": "$5.76", "manufacturer": "Corkery Inc", "category": "Movies", "quantity": 21 },
    { "serial_number": "525-21-3926", "product_name": "Nori Sea Weed - Gold Label", "price": "$451.27", "manufacturer": "Kuphal, Schaden and Schulist", "category": "Sports", "quantity": 94 },
    { "serial_number": "540-26-7224", "product_name": "Wine - Semi Dry Riesling Vineland", "price": "$96.81", "manufacturer": "Erdman and Sons", "category": "Tools", "quantity": 73 }];

    Item.remove({})
      .then(() => Item.collection.insertMany(itemSeed))
      .then(data => {
        console.log(data.result.n + ' records inserted!');
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  } catch (err) {
    // If any errors are thrown, returns a server error to clear the token from the users front end
    // and force a re-login
    console.log(err.message);
  }
}

seedDB();