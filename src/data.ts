import { Dish, Review, InstagramPost } from "./types";

// Dynamic relative image paths pointing directly to our premium generated assets
export const IMAGES = {
  hero: "/src/assets/images/feru_hero_1781601729617.jpg",
  doroWot: "/src/assets/images/Doro_Wat.png",
  coffeeCeremony: "/src/assets/images/feru_coffee_ceremony_1781601763700.jpg",
  tibs: "/src/assets/images/Chicken_Tibs.png",
  veggieCombo: "/src/assets/images/Veggie_Combo.png",
  mushroomKitfo: "/src/assets/images/Mushroom_Kitfo.png",
  bulaKitfo: "/src/assets/images/bulaKitfo.jpg",
  meatLoversCombo: "/src/assets/images/meatLoversCombo.jpg",
  owners: "/src/assets/images/owners.jpeg",
  // Standard high-quality public CDN links for miscellaneous items
  sambusa: "https://images.unsplash.com/photo-1601050690597-df056fb4db78?q=80&w=600&auto=format&fit=crop",
  kategna: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600&auto=format&fit=crop&blur=10",
  macchiato: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop",
  cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop"
};

export const DISHES: Dish[] = [
  // --- Appetizers ---
  {
    id: "app-1",
    name: "Golden Beef & Lentil Sambusa",
    description: "Crispy triangular flaky pastries filled with seasoned lean beef, green chilies, onions, cardamon, and garlic. Accompanied by our signature herbaceous dipping sauce.",
    price: 9,
    category: "Appetizers",
    image: IMAGES.sambusa,
    spicyLevel: 1,
    tags: ["Classic Starter", "Crispy"]
  },
  {
    id: "app-2",
    name: "Artisanal Kategna",
    description: "Crispy double-baked injera strips painted with dynamic berbere honey-glaze and warm kibe spiced clarified butter. Served warm with a cool house yogurt dipping cream.",
    price: 10,
    category: "Appetizers",
    image: IMAGES.kategna,
    spicyLevel: 2,
    tags: ["Authentic", "Chef's Accent"]
  },
  {
    id: "app-3",
    name: "Timatim Fitfit",
    description: "Torn pieces of soft hand-stretched injera tossed gently with fresh diced vine tomatoes, minced red onions, jalapeños, and white pepper, in a crisp lemon oil dressing.",
    price: 11,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 1,
    tags: ["Refreshing", "Vegan"]
  },

  // --- Meat Specials ---
  {
    id: "meat-1",
    name: "Doro Wot",
    description: "The crown jewel of Ethiopian cuisine. A slow-cooked, rich red chicken stew leg and hard-boiled egg simmered over 24 hours in thick berbere spice, sweet caramelized red onions, cardamon, and kibe clarified butter.",
    price: 26,
    category: "Meat Specials",
    image: IMAGES.doroWot,
    isFeatured: true,
    spicyLevel: 3,
    tags: ["National Dish", "Traditional Slow Cook"]
  },
  {
    id: "meat-2",
    name: "Sizzling Chicken Tibs",
    description: "Tender cubes of fresh chicken breast flash-sautéed in kibe clarified butter with caramelized white onions, red bell peppers, ginger, garlic, and sliced jalapeños. Served sizzling with fresh rosemary.",
    price: 23,
    category: "Meat Specials",
    image: IMAGES.tibs, // Tibs looks sizzling
    isFeatured: true,
    spicyLevel: 2,
    tags: ["House Specialty", "Fragrant"]
  },
  {
    id: "meat-3",
    name: "Special Kitfo Trio",
    description: "Hand-minced prime beef seasoned with hot mitmita pepper and infused with warm warm-spiced kibe butter. Plated elegantly with house-churned ayib (cottage cheese) and gomen (collard greens).",
    price: 28,
    category: "Meat Specials",
    image: IMAGES.bulaKitfo,
    isFeatured: true,
    spicyLevel: 3,
    tags: ["Premium Raw / Rare", "Indulgent"]
  },
  {
    id: "meat-4",
    name: "Meat Lovers Combo Platter",
    description: "A colossal sharing presentation fit for royalty. Portions of tender Doro Wot chicken, rich Segawot lamb stew, and sizzling Beef Tibs, arranged beautifully over a platter of premium sour injera.",
    price: 48,
    category: "Meat Specials",
    image: IMAGES.meatLoversCombo,
    isFeatured: true,
    spicyLevel: 2,
    tags: ["Sharing Platter", "Perfect for Two"]
  },

  // --- Vegetarian ---
  {
    id: "veg-1",
    name: "Premium Veggie Combo",
    description: "The ultimate rainbow array. Simmered red split lentils (Misir Wot), mild split peas (Kik Alicha), slow-steemed collards (Gomen), seasoned cabbage-carrots, and smooth chickpea puree (Shiro).",
    price: 22,
    category: "Vegetarian Dishes",
    image: IMAGES.veggieCombo,
    isFeatured: true,
    spicyLevel: 1,
    tags: ["Vegan King", "Gluten-Free Available"]
  },
  {
    id: "veg-2",
    name: "Wild Mushroom Kitfo",
    description: "A marvelous vegan re-imaging. Finely chopped wild portobello mushrooms sautéed in cold-pressed extra virgin olive oil, herbs, dynamic cardamom, and authentic fiery mitmita spice.",
    price: 21,
    category: "Vegetarian Dishes",
    image: IMAGES.mushroomKitfo,
    isFeatured: true,
    spicyLevel: 2,
    tags: ["Vegan", "Gluten-Free Friendly"]
  },
  {
    id: "veg-3",
    name: "Creamy Shiro Wot",
    description: "Nutty chickpea flour slow-simmered in a dynamic mixture of garlic, red onions, ginger, and berbere spices. Served in an authentic boiling clay pot with rolls of warm sourdough injera.",
    price: 18,
    category: "Vegetarian Dishes",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 2,
    tags: ["Traditional Favorite", "Vegan"]
  },

  // --- Seafood ---
  {
    id: "sea-1",
    name: "Sautéed Shrimp Tibs",
    description: "Jumbo wild-caught prawns flash-simmered in clarified butter, wine glaze, rosemary stalks, caramelized onion ribbons, juicy tomatoes, and vibrant fresh jalapeños.",
    price: 28,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1559742811-824289511f48?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 1,
    tags: ["Coastal Fusion", "Fragrant"]
  },
  {
    id: "sea-2",
    name: "Imperial Gilded Asa Tibs",
    description: "Crispy skin-on sea bass fillet crusted with Ethiopian mild spices, pan-seared with rosemary olive oil, served atop a pureed spinach nest with a lime-shallot vinaigrette.",
    price: 29,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 1,
    tags: ["Fine Dining", "Seared Perfect"]
  },

  // --- Sandwiches & Pasta ---
  {
    id: "past-1",
    name: "The Feru Berbere Burger",
    description: "A dry-aged Angus beef custom blend seasoned with subtle spice, topped with smoked provolone, berbere caramelized sweet onions, organic arugula, and spicy kibe aioli on brioche.",
    price: 18,
    category: "Sandwiches & Pasta",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 1,
    tags: ["Lunch Favorite", "Modern Twist"]
  },
  {
    id: "past-2",
    name: "Linguine Berbere Bolognese",
    description: "Linguine tossed in rich, slow-cooked Angus beef ragù infused with traditional berbere, red onions, garlic, fresh green herbs, finished with grated aged parmesan.",
    price: 19,
    category: "Sandwiches & Pasta",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 2,
    tags: ["Italo-Ethiopian Heritage", "Hearty"]
  },

  // --- Desserts ---
  {
    id: "des-1",
    name: "Cardamom Bean Crème Brûlée",
    description: "A velvety, rich double-cream custard steeped with organic cardamom pods and vanilla, finished with a brittle glass-shatter layer of torched pure sugar candy.",
    price: 12,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 0,
    tags: ["Sweet Harmony", "Elegant Finish"]
  },
  {
    id: "des-2",
    name: "Tej honey Poached Pears",
    description: "Fresh orchard pear halves poached delicately in our house honey wine (Tej) spiced with sweet cinnamon bark and star anise. Served with frozen hazelnut gelato.",
    price: 13,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 0,
    tags: ["Signature Craft", "Unique"]
  },

  // --- Hot Drinks ---
  {
    id: "hot-1",
    name: "Traditional Macchiato",
    description: "Intense, complex double shot of organic Yirgacheffe espresso pulled perfectly, topped with a micro-thin, dense cloud of velvety hot frothed milk.",
    price: 5,
    category: "Hot Drinks",
    image: IMAGES.macchiato,
    spicyLevel: 0,
    tags: ["Barista Special", "Ethiopian Beans"]
  },
  {
    id: "hot-2",
    name: "Sacred Spiced Herbal Tea",
    description: "Black premium loose leaf tea infused with hand-crushed cinnamon, sweet cloves, green cardamom, and ginger roots. Nourishing and aromatic.",
    price: 4,
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 0,
    tags: ["Aromatic", "Decompress"]
  },

  // --- Cocktails & Wine ---
  {
    id: "alc-1",
    name: "The Gilded Tej-Sling",
    description: "Custom craft-brewed Ethiopian honey wine (Tej) combined with premium dry ginger ale, small-batch bourbon, fresh sour lemon juice, and a gold leaf garnish.",
    price: 16,
    category: "Cocktails & Wine",
    image: IMAGES.cocktail,
    spicyLevel: 0,
    tags: ["House Signature", "Honey Wine Base"]
  },
  {
    id: "alc-2",
    name: "Habesha Gold Old-Fashioned",
    description: "A premium bourbon wash steeped with roasted cardamom pods, warm aromatic angostura bitters, orange zest twists, and an ice cube stamped with our tribal crest.",
    price: 17,
    category: "Cocktails & Wine",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600&auto=format&fit=crop",
    spicyLevel: 0,
    tags: ["Smoky & Rich", "Luxury"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Jessica Sterling",
    rating: 5,
    text: "Absolutely mind-blowing. Feru sets a new bar for modern dining in Northern Virginia. The Doro Wot was incredibly rich and layered. The service is Michelin-caliber and the gold-accented atmosphere feels like a secret sensory oasis.",
    time: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "rev-2",
    author: "Dr. Eyob Assefa",
    rating: 5,
    text: "As someone who grew up in Addis, I am highly critical of diaspora culinary efforts. Feru, however, respects the culture while elevating the presentation to pure fine dining. Their kibe and berbere blends are authentic and premium. Fantastic coffee ceremony!",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "rev-3",
    author: "Marcus Vance",
    rating: 5,
    text: "An unforgettable night. The cocktail menu alone is worth the trip—that Tej Sling is brilliant. The space is darkly romantic, modern, and pays stunning homage to Ethiopian art without being cliché. Perfect date spot in Alexandria.",
    time: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    imageUrl: IMAGES.doroWot,
    likes: 412,
    comments: 24,
    caption: "Our signature, ultra-slow simmered 24-hr Doro Wot chicken stew. Traditional soul meets high-end plating. #FeruAlexandria #FineDining"
  },
  {
    id: "ig-2",
    imageUrl: IMAGES.coffeeCeremony,
    likes: 589,
    comments: 42,
    caption: "The sacred aroma of Yirgacheffe espresso beans roasting on our open stove. Reserve your front-row seat to the Coffee Ceremony tonight. #EthioCoffee #FeruCulture"
  },
  {
    id: "ig-3",
    imageUrl: IMAGES.tibs,
    likes: 350,
    comments: 18,
    caption: "Sizzling kibe-sautéed Chicken Tibs flavored with sweet rosemary bundles and fresh roasted pepper. Hear the sizzle, feel the gold. #EthiopianFood"
  },
  {
    id: "ig-4",
    imageUrl: IMAGES.veggieCombo,
    likes: 673,
    comments: 54,
    caption: "An vibrant canvas of nutrition. Our Premium Veggie Combo is organic, strictly vegan, and incredibly flavorful. #VeganVirginia #HealthyLux"
  }
];
