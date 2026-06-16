export type Category =
  | "croissants" | "doughnuts" | "cinnamon-rolls" | "danish" | "puff" | "eclairs"
  | "turnovers" | "tarts" | "pies" | "macarons" | "cookies" | "brownies" | "cupcakes"
  | "ice-cream-cakes" | "cheesecakes" | "flans" | "creme-brulee" | "tiramisu"
  | "panna-cotta" | "gelato" | "sundaes" | "seasonal" | "signature";

export interface Product {
  id: string;
  name: string;
  category: Category;
  group: "pastries" | "desserts" | "signature";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  ingredients: string[];
  nutrition: { calories: number; fat: number; carbs: number; protein: number };
  bestseller?: boolean;
  badge?: string;
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const products: Product[] = [
  { id: "butter-croissant", name: "Golden Butter Croissant", category: "croissants", group: "pastries", price: 4.5, rating: 4.9, reviews: 312, image: img("photo-1555507036-ab1f4038808a"), description: "Flaky, golden-brown layers of buttery perfection, hand-laminated over three days.", ingredients: ["French butter", "Heritage wheat flour", "Sea salt", "Cane sugar", "Fresh yeast"], nutrition: { calories: 290, fat: 16, carbs: 31, protein: 6 }, bestseller: true, badge: "Bestseller" },
  { id: "chocolate-croissant", name: "Dark Chocolate Croissant", category: "croissants", group: "pastries", price: 5.25, rating: 4.8, reviews: 241, image: img("photo-1623334044303-241021148842"), description: "Pain au chocolat with rich 70% Valrhona chocolate batons.", ingredients: ["Valrhona chocolate", "French butter", "Wheat flour", "Eggs"], nutrition: { calories: 340, fat: 19, carbs: 36, protein: 7 } },
  { id: "almond-croissant", name: "Almond Cream Croissant", category: "croissants", group: "pastries", price: 5.75, rating: 4.9, reviews: 198, image: img("photo-1568827999250-3f6afff96e66"), description: "Filled with house-made almond frangipane, dusted with sugar.", ingredients: ["Almond paste", "Butter", "Flour", "Sugar"], nutrition: { calories: 380, fat: 22, carbs: 38, protein: 9 } },

  { id: "glazed-doughnut", name: "Classic Glazed Doughnut", category: "doughnuts", group: "pastries", price: 3.5, rating: 4.7, reviews: 528, image: img("photo-1551024601-bec78aea704b"), description: "Pillowy soft brioche doughnut with a delicate vanilla glaze.", ingredients: ["Brioche dough", "Vanilla glaze", "Powdered sugar"], nutrition: { calories: 260, fat: 12, carbs: 35, protein: 4 }, bestseller: true },
  { id: "chocolate-doughnut", name: "Chocolate Sprinkle Doughnut", category: "doughnuts", group: "pastries", price: 3.75, rating: 4.6, reviews: 412, image: img("photo-1606890737304-57a1ca8a5b62"), description: "Decadent chocolate-glazed doughnut topped with rainbow sprinkles.", ingredients: ["Cocoa", "Chocolate ganache", "Sprinkles"], nutrition: { calories: 290, fat: 14, carbs: 38, protein: 4 } },

  { id: "cinnamon-roll", name: "Sticky Cinnamon Roll", category: "cinnamon-rolls", group: "pastries", price: 4.95, rating: 4.9, reviews: 387, image: img("photo-1509365465985-25d11c17e812"), description: "Warm, gooey swirls of Saigon cinnamon with cream cheese frosting.", ingredients: ["Saigon cinnamon", "Brown sugar", "Cream cheese", "Butter"], nutrition: { calories: 410, fat: 18, carbs: 56, protein: 6 }, bestseller: true, badge: "Fan Favorite" },

  { id: "danish-fruit", name: "Berry Danish Pastry", category: "danish", group: "pastries", price: 4.5, rating: 4.7, reviews: 156, image: img("photo-1517433367423-c7e5b0f35086"), description: "Buttery danish with seasonal berries and vanilla custard.", ingredients: ["Berries", "Vanilla custard", "Puff pastry"], nutrition: { calories: 310, fat: 15, carbs: 40, protein: 5 } },
  { id: "puff-pastry-twist", name: "Cheese Puff Pastry Twist", category: "puff", group: "pastries", price: 3.95, rating: 4.5, reviews: 98, image: img("photo-1620921568790-c1cf8984624c"), description: "Crisp, flaky twists with aged gruyère.", ingredients: ["Gruyère", "Puff pastry", "Sea salt"], nutrition: { calories: 280, fat: 18, carbs: 22, protein: 8 } },

  { id: "eclair-chocolate", name: "Chocolate Éclair", category: "eclairs", group: "pastries", price: 5.5, rating: 4.8, reviews: 224, image: img("photo-1612203985729-70726954388c"), description: "Choux pastry filled with vanilla cream, crowned in chocolate fondant.", ingredients: ["Choux pastry", "Vanilla cream", "Chocolate fondant"], nutrition: { calories: 320, fat: 17, carbs: 35, protein: 6 } },

  { id: "apple-turnover", name: "Cinnamon Apple Turnover", category: "turnovers", group: "pastries", price: 4.25, rating: 4.6, reviews: 142, image: img("photo-1535920527002-b35e96722eb9"), description: "Spiced apples wrapped in golden puff pastry.", ingredients: ["Apples", "Cinnamon", "Puff pastry"], nutrition: { calories: 270, fat: 13, carbs: 36, protein: 3 } },

  { id: "fruit-tart", name: "Seasonal Fruit Tart", category: "tarts", group: "pastries", price: 7.5, rating: 4.9, reviews: 267, image: img("photo-1488477181946-6428a0291777"), description: "Sablé crust, vanilla bean pastry cream, and a jewel of fresh fruit.", ingredients: ["Sablé crust", "Pastry cream", "Fresh fruit", "Apricot glaze"], nutrition: { calories: 340, fat: 15, carbs: 48, protein: 5 }, bestseller: true },

  { id: "apple-pie", name: "Classic Apple Pie", category: "pies", group: "pastries", price: 28, rating: 4.8, reviews: 189, image: img("photo-1568571780765-9276ac8b75a2"), description: "Whole pie. Lattice top with caramelized cinnamon apples.", ingredients: ["Apples", "Cinnamon", "Pie crust"], nutrition: { calories: 320, fat: 14, carbs: 48, protein: 3 } },

  { id: "macarons-box", name: "Parisian Macarons (Box of 12)", category: "macarons", group: "pastries", price: 32, rating: 5.0, reviews: 521, image: img("photo-1558326567-98ae2405596b"), description: "Assorted flavors: rose, pistachio, vanilla, raspberry, chocolate, salted caramel.", ingredients: ["Almond flour", "Egg whites", "Sugar", "Ganache"], nutrition: { calories: 90, fat: 4, carbs: 12, protein: 2 }, bestseller: true, badge: "Iconic" },

  { id: "cookies-trio", name: "Chocolate Chunk Cookies (3-pack)", category: "cookies", group: "pastries", price: 9, rating: 4.7, reviews: 304, image: img("photo-1499636136210-6f4ee915583e"), description: "Brown butter cookies with melty chocolate chunks and Maldon salt.", ingredients: ["Brown butter", "Chocolate chunks", "Maldon salt"], nutrition: { calories: 280, fat: 14, carbs: 36, protein: 4 } },

  { id: "fudge-brownie", name: "Triple Fudge Brownie", category: "brownies", group: "pastries", price: 5.5, rating: 4.9, reviews: 412, image: img("photo-1606313564200-e75d5e30476c"), description: "Dense, fudgy, deeply chocolaty with a crackly top.", ingredients: ["Dark chocolate", "Cocoa", "Butter", "Eggs"], nutrition: { calories: 380, fat: 22, carbs: 42, protein: 5 } },

  { id: "vanilla-cupcake", name: "Vanilla Bean Cupcake", category: "cupcakes", group: "pastries", price: 4.25, rating: 4.6, reviews: 178, image: img("photo-1486427944299-d1955d23e34d"), description: "Tahitian vanilla cake with silky Swiss meringue buttercream.", ingredients: ["Vanilla bean", "Butter", "Eggs", "Flour"], nutrition: { calories: 320, fat: 16, carbs: 40, protein: 4 } },

  { id: "ice-cream-cake", name: "Signature Ice Cream Cake", category: "ice-cream-cakes", group: "desserts", price: 58, rating: 4.9, reviews: 234, image: img("photo-1535254973040-607b474cb50d"), description: "Layered chocolate cake, vanilla bean gelato, raspberry compote, mirror glaze.", ingredients: ["Vanilla gelato", "Chocolate cake", "Raspberry", "Mirror glaze"], nutrition: { calories: 420, fat: 22, carbs: 52, protein: 6 }, bestseller: true, badge: "Signature" },

  { id: "ny-cheesecake", name: "New York Cheesecake", category: "cheesecakes", group: "desserts", price: 8.5, rating: 4.9, reviews: 612, image: img("photo-1533134242443-d4fd215305ad"), description: "Classic dense, creamy New York-style cheesecake on graham crust.", ingredients: ["Cream cheese", "Graham crust", "Vanilla"], nutrition: { calories: 410, fat: 28, carbs: 32, protein: 7 }, bestseller: true },
  { id: "strawberry-cheesecake", name: "Strawberry Cheesecake", category: "cheesecakes", group: "desserts", price: 9, rating: 4.8, reviews: 387, image: img("photo-1546039907-7fa05f864c02"), description: "Topped with macerated strawberries and a hint of basil.", ingredients: ["Strawberries", "Cream cheese", "Graham crust"], nutrition: { calories: 430, fat: 27, carbs: 38, protein: 7 } },
  { id: "blueberry-cheesecake", name: "Blueberry Cheesecake", category: "cheesecakes", group: "desserts", price: 9, rating: 4.8, reviews: 256, image: img("photo-1488477181946-6428a0291777"), description: "Wild blueberry compote over silky cheesecake.", ingredients: ["Blueberries", "Cream cheese", "Lemon zest"], nutrition: { calories: 420, fat: 26, carbs: 36, protein: 7 } },
  { id: "chocolate-cheesecake", name: "Dark Chocolate Cheesecake", category: "cheesecakes", group: "desserts", price: 9.5, rating: 4.9, reviews: 298, image: img("photo-1567306226416-28f0efdc88ce"), description: "Decadent Belgian chocolate cheesecake with cocoa nib crust.", ingredients: ["Belgian chocolate", "Cream cheese", "Cocoa nibs"], nutrition: { calories: 470, fat: 31, carbs: 38, protein: 8 } },

  { id: "flan", name: "Caramel Flan", category: "flans", group: "desserts", price: 7, rating: 4.7, reviews: 142, image: img("photo-1551024506-0bccd828d307"), description: "Silken vanilla flan in a pool of burnt caramel.", ingredients: ["Vanilla", "Eggs", "Caramel", "Cream"], nutrition: { calories: 310, fat: 14, carbs: 40, protein: 7 } },

  { id: "creme-brulee", name: "Vanilla Crème Brûlée", category: "creme-brulee", group: "desserts", price: 9.5, rating: 4.9, reviews: 421, image: img("photo-1470124182917-cc6e71b22ecc"), description: "Tahitian vanilla custard with a crackling caramelized sugar crust.", ingredients: ["Tahitian vanilla", "Cream", "Egg yolks", "Sugar"], nutrition: { calories: 380, fat: 28, carbs: 26, protein: 5 }, bestseller: true },

  { id: "tiramisu", name: "Classic Tiramisu", category: "tiramisu", group: "desserts", price: 8.5, rating: 4.8, reviews: 367, image: img("photo-1571877227200-a0d98ea607e9"), description: "Espresso-soaked ladyfingers, mascarpone cream, cocoa.", ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa"], nutrition: { calories: 390, fat: 24, carbs: 32, protein: 6 } },

  { id: "panna-cotta", name: "Vanilla Panna Cotta", category: "panna-cotta", group: "desserts", price: 7.5, rating: 4.7, reviews: 178, image: img("photo-1488477181946-6428a0291777"), description: "Silky Italian cream with berry coulis.", ingredients: ["Cream", "Vanilla", "Gelatin", "Berries"], nutrition: { calories: 290, fat: 20, carbs: 22, protein: 4 } },

  { id: "gelato-trio", name: "Artisan Gelato Trio", category: "gelato", group: "desserts", price: 12, rating: 4.8, reviews: 245, image: img("photo-1567206563064-6f60f40a2b57"), description: "Three scoops: pistachio, stracciatella, salted caramel.", ingredients: ["Milk", "Cream", "Pistachio", "Chocolate"], nutrition: { calories: 320, fat: 18, carbs: 34, protein: 6 } },

  { id: "sundae-classic", name: "Hot Fudge Sundae", category: "sundaes", group: "desserts", price: 11, rating: 4.7, reviews: 198, image: img("photo-1488900128323-21503983a07e"), description: "Vanilla bean ice cream, warm fudge, candied pecans, cherry.", ingredients: ["Vanilla ice cream", "Hot fudge", "Pecans"], nutrition: { calories: 540, fat: 28, carbs: 62, protein: 8 } },

  { id: "seasonal-pumpkin", name: "Spiced Pumpkin Tart", category: "seasonal", group: "signature", price: 8.5, rating: 4.8, reviews: 87, image: img("photo-1571115764595-644a1f56a55c"), description: "Limited edition. Roasted pumpkin, brown butter, candied pepitas.", ingredients: ["Pumpkin", "Brown butter", "Pepitas"], nutrition: { calories: 360, fat: 18, carbs: 44, protein: 5 }, badge: "Seasonal" },

  { id: "signature-haven", name: "The Haven Centerpiece", category: "signature", group: "signature", price: 78, rating: 5.0, reviews: 64, image: img("photo-1565958011703-44f9829ba187"), description: "Our flagship dome: layered mousse, ganache, crémeux, dark mirror glaze. Serves 8.", ingredients: ["Dark chocolate", "Hazelnut", "Caramel", "Cocoa mirror glaze"], nutrition: { calories: 480, fat: 30, carbs: 46, protein: 7 }, bestseller: true, badge: "Signature" },
];

export const categories: { slug: Category; name: string; group: "pastries" | "desserts"; image: string }[] = [
  { slug: "croissants", name: "Croissants", group: "pastries", image: img("photo-1555507036-ab1f4038808a") },
  { slug: "doughnuts", name: "Doughnuts", group: "pastries", image: img("photo-1551024601-bec78aea704b") },
  { slug: "cinnamon-rolls", name: "Cinnamon Rolls", group: "pastries", image: img("photo-1509365465985-25d11c17e812") },
  { slug: "danish", name: "Danish Pastries", group: "pastries", image: img("photo-1517433367423-c7e5b0f35086") },
  { slug: "puff", name: "Puff Pastries", group: "pastries", image: img("photo-1620921568790-c1cf8984624c") },
  { slug: "eclairs", name: "Éclairs", group: "pastries", image: img("photo-1612203985729-70726954388c") },
  { slug: "macarons", name: "Macarons", group: "pastries", image: img("photo-1558326567-98ae2405596b") },
  { slug: "tarts", name: "Fruit Tarts", group: "pastries", image: img("photo-1488477181946-6428a0291777") },
  { slug: "cheesecakes", name: "Cheesecakes", group: "desserts", image: img("photo-1533134242443-d4fd215305ad") },
  { slug: "ice-cream-cakes", name: "Ice Cream Cakes", group: "desserts", image: img("photo-1535254973040-607b474cb50d") },
  { slug: "creme-brulee", name: "Crème Brûlée", group: "desserts", image: img("photo-1470124182917-cc6e71b22ecc") },
  { slug: "tiramisu", name: "Tiramisu", group: "desserts", image: img("photo-1571877227200-a0d98ea607e9") },
  { slug: "gelato", name: "Gelato", group: "desserts", image: img("photo-1567206563064-6f60f40a2b57") },
  { slug: "panna-cotta", name: "Panna Cotta", group: "desserts", image: img("photo-1488477181946-6428a0291777") },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const getRelated = (id: string, n = 4) => {
  const p = getProduct(id);
  if (!p) return [];
  return products.filter((x) => x.id !== id && x.group === p.group).slice(0, n);
};
