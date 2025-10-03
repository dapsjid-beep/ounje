
import { useState } from 'react';
import Button from '../../../components/base/Button';

const categories = ['All', 'Main Dishes', 'Grilled', 'Vegetarian', 'Desserts', 'Beverages'];
const regions = ['All Regions', 'Nigerian', 'Intercontinental'];
const spiceLevels = ['All Levels', 'Mild', 'Medium', 'Hot', 'Extra Hot'];
const priceRanges = ['All Prices', '$10-20', '$20-30', '$30-40', '$40+'];

const featuredDishes = [
  // Nigerian Specialties - matching FeaturedCuisines component
  {
    id: 1,
    name: 'Jollof Rice',
    region: 'Nigerian',
    category: 'Main Dishes',
    price: '$18.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20jollof%20rice%20with%20perfectly%20grilled%20chicken%2C%20served%20with%20fried%20plantains%20and%20coleslaw%2C%20vibrant%20orange%20rice%20with%20traditional%20Nigerian%20spices%2C%20professional%20food%20photography%20with%20warm%20lighting&width=300&height=200&seq=nigerian-jollof&orientation=landscape',
    rating: 4.9,
    cookTime: '25 mins',
    popular: true
  },
  {
    id: 2,
    name: 'Pounded Yam & Egusi',
    region: 'Nigerian',
    category: 'Main Dishes',
    price: '$22.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20pounded%20yam%20with%20rich%20egusi%20soup%20containing%20melon%20seeds%2C%20spinach%2C%20assorted%20meat%20and%20fish%2C%20authentic%20presentation%20in%20clay%20bowls%20with%20traditional%20Nigerian%20dining%20setup&width=300&height=200&seq=pounded-yam-egusi&orientation=landscape',
    rating: 4.8,
    cookTime: '35 mins',
    popular: true
  },
  {
    id: 3,
    name: 'Suya Platter',
    region: 'Nigerian',
    category: 'Grilled',
    price: '$16.99',
    spiceLevel: 'Hot',
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20suya%20beef%20skewers%20with%20traditional%20yaji%20spice%20coating%20on%20wooden%20sticks%2C%20served%20with%20sliced%20onions%2C%20tomatoes%2C%20and%20cucumber%20on%20banana%20leaves%2C%20authentic%20street%20food%20presentation&width=300&height=200&seq=nigerian-suya&orientation=landscape',
    rating: 4.9,
    cookTime: '15 mins',
    popular: true
  },
  {
    id: 4,
    name: 'Pepper Soup',
    region: 'Nigerian',
    category: 'Main Dishes',
    price: '$19.99',
    spiceLevel: 'Hot',
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20pepper%20soup%20with%20fresh%20catfish%20in%20clear%20spicy%20broth%2C%20served%20in%20traditional%20clay%20pot%20with%20scent%20leaves%20and%20hot%20peppers%2C%20authentic%20Nigerian%20soup%20presentation%20with%20steam%20rising&width=300&height=200&seq=pepper-soup-catfish&orientation=landscape',
    rating: 4.7,
    cookTime: '20 mins',
    popular: false
  },
  {
    id: 5,
    name: 'Amala & Ewedu',
    region: 'Nigerian',
    category: 'Main Dishes',
    price: '$20.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20amala%20with%20gbegiri%20bean%20soup%20and%20ewedu%20jute%20leaves%20soup%2C%20served%20with%20assorted%20meat%2C%20authentic%20Yoruba%20presentation%20in%20traditional%20bowls%20with%20palm%20oil%20garnish&width=300&height=200&seq=amala-gbegiri-ewedu&orientation=landscape',
    rating: 4.5,
    cookTime: '30 mins',
    popular: false
  },
  {
    id: 6,
    name: 'Fried Rice',
    region: 'Nigerian',
    category: 'Main Dishes',
    price: '$17.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20style%20fried%20rice%20with%20colorful%20mixed%20vegetables%2C%20shrimp%2C%20chicken%20pieces%2C%20green%20peas%2C%20and%20carrots%2C%20vibrant%20presentation%20in%20elegant%20serving%20dish%20with%20Nigerian%20styling&width=300&height=200&seq=nigerian-fried-rice&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: false
  },
  // Intercontinental Specialties - matching FeaturedCuisines component
  {
    id: 7,
    name: 'Grilled Salmon',
    region: 'Intercontinental',
    category: 'Main Dishes',
    price: '$28.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20grilled%20salmon%20fillet%20with%20golden%20lemon%20butter%20sauce%2C%20colorful%20roasted%20vegetables%2C%20and%20fluffy%20rice%20pilaf%2C%20fine%20dining%20presentation%20on%20white%20porcelain%20plate%20with%20professional%20lighting&width=300&height=200&seq=grilled-salmon&orientation=landscape',
    rating: 4.8,
    cookTime: '20 mins',
    popular: true
  },
  {
    id: 8,
    name: 'Chicken Alfredo',
    region: 'Intercontinental',
    category: 'Main Dishes',
    price: '$24.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Creamy%20chicken%20alfredo%20pasta%20with%20fettuccine%20noodles%2C%20grilled%20chicken%20strips%2C%20rich%20white%20sauce%2C%20parmesan%20cheese%2C%20and%20fresh%20parsley%2C%20elegant%20Italian%20restaurant%20presentation&width=300&height=200&seq=chicken-alfredo&orientation=landscape',
    rating: 4.7,
    cookTime: '18 mins',
    popular: true
  },
  {
    id: 9,
    name: 'Beef Steak',
    region: 'Intercontinental',
    category: 'Grilled',
    price: '$32.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Juicy%20beef%20sirloin%20steak%20with%20creamy%20mushroom%20sauce%2C%20smooth%20mashed%20potatoes%2C%20and%20grilled%20asparagus%2C%20upscale%20steakhouse%20presentation%20on%20black%20slate%20plate%20with%20elegant%20garnish&width=300&height=200&seq=beef-steak-mushroom&orientation=landscape',
    rating: 4.9,
    cookTime: '25 mins',
    popular: true
  },
  {
    id: 10,
    name: 'Caesar Salad',
    region: 'Intercontinental',
    category: 'Vegetarian',
    price: '$16.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Fresh%20Caesar%20salad%20with%20crisp%20romaine%20lettuce%2C%20parmesan%20shavings%2C%20golden%20croutons%2C%20and%20sliced%20grilled%20chicken%2C%20classic%20presentation%20in%20white%20bowl%20with%20caesar%20dressing%20drizzle&width=300&height=200&seq=caesar-salad-chicken&orientation=landscape',
    rating: 4.5,
    cookTime: '12 mins',
    popular: false
  },
  {
    id: 11,
    name: 'Shrimp Scampi',
    region: 'Intercontinental',
    category: 'Main Dishes',
    price: '$26.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20shrimp%20scampi%20with%20large%20prawns%20in%20garlic%20butter%20white%20wine%20sauce%20over%20linguine%20pasta%2C%20garnished%20with%20fresh%20parsley%20and%20lemon%20wedges%2C%20Italian%20restaurant%20presentation&width=300&height=200&seq=shrimp-scampi&orientation=landscape',
    rating: 4.6,
    cookTime: '15 mins',
    popular: false
  },
  {
    id: 12,
    name: 'BBQ Ribs',
    region: 'Intercontinental',
    category: 'Grilled',
    price: '$29.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Smoky%20BBQ%20pork%20ribs%20with%20glossy%20barbecue%20sauce%2C%20served%20with%20creamy%20coleslaw%2C%20baked%20beans%2C%20and%20golden%20cornbread%2C%20American%20barbecue%20restaurant%20presentation%20on%20wooden%20board&width=300&height=200&seq=bbq-ribs-platter&orientation=landscape',
    rating: 4.8,
    cookTime: '35 mins',
    popular: true
  },

  // Additional Vegetarian Dishes from Menu
  {
    id: 13,
    name: 'Vegetarian Jollof Rice',
    region: 'Nigerian',
    category: 'Vegetarian',
    price: '$15.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Colorful%20vegetarian%20Nigerian%20jollof%20rice%20with%20mixed%20vegetables%2C%20fried%20plantains%2C%20and%20traditional%20spices%2C%20vibrant%20orange%20rice%20with%20plant-based%20ingredients%2C%20healthy%20presentation%20with%20fresh%20garnish&width=300&height=200&seq=vegetarian-jollof&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: true
  },
  {
    id: 14,
    name: 'Vegetable Egusi Soup',
    region: 'Nigerian',
    category: 'Vegetarian',
    price: '$18.99',
    spiceLevel: 'Medium',
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20vegetable%20egusi%20soup%20with%20melon%20seeds%2C%20spinach%2C%20pumpkin%20leaves%2C%20and%20assorted%20vegetables%20in%20traditional%20clay%20bowl%2C%20rich%20green%20color%20with%20palm%20oil%20garnish%2C%20vegetarian%20presentation&width=300&height=200&seq=vegetable-egusi&orientation=landscape',
    rating: 4.5,
    cookTime: '30 mins',
    popular: false
  },
  {
    id: 15,
    name: 'Quinoa Buddha Bowl',
    region: 'Intercontinental',
    category: 'Vegetarian',
    price: '$19.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Colorful%20quinoa%20buddha%20bowl%20with%20roasted%20vegetables%2C%20avocado%20slices%2C%20chickpeas%2C%20cherry%20tomatoes%2C%20and%20tahini%20dressing%2C%20healthy%20presentation%20in%20white%20bowl%20with%20vibrant%20colors%20and%20fresh%20herbs&width=300&height=200&seq=quinoa-buddha-bowl&orientation=landscape',
    rating: 4.7,
    cookTime: '15 mins',
    popular: true
  },
  {
    id: 16,
    name: 'Mushroom Risotto',
    region: 'Intercontinental',
    category: 'Vegetarian',
    price: '$21.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Creamy%20mushroom%20risotto%20with%20mixed%20wild%20mushrooms%2C%20parmesan%20cheese%2C%20fresh%20herbs%2C%20elegant%20Italian%20presentation%20in%20white%20bowl%20with%20truffle%20oil%20drizzle%20and%20garnish&width=300&height=200&seq=mushroom-risotto&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: true
  },
  {
    id: 17,
    name: 'Vegetable Stir Fry',
    region: 'Intercontinental',
    category: 'Vegetarian',
    price: '$16.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Colorful%20vegetable%20stir%20fry%20with%20broccoli%2C%20bell%20peppers%2C%20carrots%2C%20snap%20peas%2C%20mushrooms%20in%20savory%20sauce%2C%20served%20over%20jasmine%20rice%2C%20Asian%20restaurant%20presentation%20with%20chopsticks&width=300&height=200&seq=vegetable-stir-fry&orientation=landscape',
    rating: 4.3,
    cookTime: '12 mins',
    popular: false
  },
  {
    id: 18,
    name: 'Falafel Wrap',
    region: 'Intercontinental',
    category: 'Vegetarian',
    price: '$13.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Fresh%20falafel%20wrap%20with%20crispy%20falafel%20balls%2C%20hummus%2C%20lettuce%2C%20tomatoes%2C%20cucumber%2C%20tahini%20sauce%20in%20pita%20bread%2C%20Mediterranean%20presentation%20with%20colorful%20vegetables&width=300&height=200&seq=falafel-wrap&orientation=landscape',
    rating: 4.4,
    cookTime: '10 mins',
    popular: false
  },

  // Desserts from Menu
  {
    id: 19,
    name: 'Nigerian Puff Puff',
    region: 'Nigerian',
    category: 'Desserts',
    price: '$7.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Golden%20Nigerian%20puff%20puff%20sweet%20fried%20dough%20balls%20dusted%20with%20powdered%20sugar%20in%20elegant%20ceramic%20bowl%2C%20traditional%20Nigerian%20dessert%20with%20light%20fluffy%20texture%2C%20warm%20kitchen%20lighting%20with%20authentic%20presentation%20and%20garnish&width=300&height=200&seq=nigerian-puff-puff-dessert&orientation=landscape',
    rating: 4.5,
    cookTime: '8 mins',
    popular: true
  },
  {
    id: 20,
    name: 'Coconut Rice Pudding',
    region: 'Nigerian',
    category: 'Desserts',
    price: '$9.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Creamy%20coconut%20rice%20pudding%20with%20vanilla%20and%20cinnamon%20in%20glass%20dessert%20bowl%2C%20topped%20with%20toasted%20coconut%20flakes%20and%20fresh%20tropical%20fruits%2C%20elegant%20dessert%20presentation%20with%20coconut%20garnish%20and%20mint%20leaves&width=300&height=200&seq=coconut-rice-pudding-dessert&orientation=landscape',
    rating: 4.4,
    cookTime: '5 mins',
    popular: false
  },
  {
    id: 21,
    name: 'Chocolate Lava Cake',
    region: 'Intercontinental',
    category: 'Desserts',
    price: '$12.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Decadent%20chocolate%20lava%20cake%20with%20molten%20chocolate%20center%20flowing%20out%20onto%20white%20plate%2C%20served%20with%20vanilla%20ice%20cream%20scoop%20and%20fresh%20berries%2C%20elegant%20fine%20dining%20dessert%20presentation%20with%20chocolate%20drizzle%20and%20powdered%20sugar%20dusting&width=300&height=200&seq=chocolate-lava-cake-dessert&orientation=landscape',
    rating: 4.8,
    cookTime: '12 mins',
    popular: true
  },
  {
    id: 22,
    name: 'Tiramisu',
    region: 'Intercontinental',
    category: 'Desserts',
    price: '$11.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Classic%20Italian%20tiramisu%20dessert%20in%20clear%20glass%20dish%20with%20layers%20of%20coffee-soaked%20ladyfingers%20and%20creamy%20mascarpone%2C%20dusted%20with%20cocoa%20powder%2C%20garnished%20with%20coffee%20beans%20and%20fresh%20mint%2C%20elegant%20restaurant%20presentation&width=300&height=200&seq=tiramisu-italian-dessert&orientation=landscape',
    rating: 4.7,
    cookTime: '5 mins',
    popular: true
  },
  {
    id: 23,
    name: 'New York Cheesecake',
    region: 'Intercontinental',
    category: 'Desserts',
    price: '$10.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Rich%20New%20York%20style%20cheesecake%20slice%20with%20golden%20graham%20cracker%20crust%20on%20white%20porcelain%20plate%2C%20topped%20with%20mixed%20berry%20compote%20and%20fresh%20strawberries%2C%20elegant%20bakery%20presentation%20with%20berry%20sauce%20drizzle%20and%20mint%20garnish&width=300&height=200&seq=new-york-cheesecake-dessert&orientation=landscape',
    rating: 4.6,
    cookTime: '3 mins',
    popular: false
  },
  {
    id: 24,
    name: 'Fresh Fruit Tart',
    region: 'Intercontinental',
    category: 'Desserts',
    price: '$9.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20fresh%20fruit%20tart%20with%20golden%20buttery%20pastry%20shell%2C%20vanilla%20custard%20filling%2C%20arranged%20with%20colorful%20fresh%20fruits%20including%20strawberries%2C%20kiwi%2C%20blueberries%2C%20and%20grapes%2C%20elegant%20French%20bakery%20presentation%20with%20apricot%20glaze%20shine&width=300&height=200&seq=fresh-fruit-tart-dessert&orientation=landscape',
    rating: 4.4,
    cookTime: '5 mins',
    popular: false
  },
  {
    id: 25,
    name: 'Ice Cream Sundae',
    region: 'Intercontinental',
    category: 'Desserts',
    price: '$8.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Classic%20ice%20cream%20sundae%20with%20three%20scoops%20of%20vanilla%2C%20chocolate%2C%20and%20strawberry%20ice%20cream%20in%20tall%20glass%20bowl%2C%20drizzled%20with%20chocolate%20sauce%2C%20topped%20with%20whipped%20cream%2C%20chopped%20nuts%2C%20and%20maraschino%20cherry%2C%20nostalgic%20soda%20fountain%20presentation&width=300&height=200&seq=ice-cream-sundae-dessert&orientation=landscape',
    rating: 4.3,
    cookTime: '3 mins',
    popular: true
  },

  // Beverages from Menu
  {
    id: 26,
    name: 'Nigerian Zobo Drink',
    region: 'Nigerian',
    category: 'Beverages',
    price: '$5.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Refreshing%20Nigerian%20zobo%20hibiscus%20drink%20in%20tall%20glass%20pitcher%20and%20glasses%20with%20ice%20cubes%2C%20vibrant%20red%20color%2C%20garnished%20with%20fresh%20cucumber%20slices%2C%20watermelon%20pieces%2C%20ginger%2C%20and%20mint%20leaves%2C%20tropical%20presentation%20with%20Nigerian%20styling&width=300&height=200&seq=nigerian-zobo-drink-beverage&orientation=landscape',
    rating: 4.6,
    cookTime: '2 mins',
    popular: true
  },
  {
    id: 27,
    name: 'Palm Wine',
    region: 'Nigerian',
    category: 'Beverages',
    price: '$7.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20palm%20wine%20served%20in%20authentic%20calabash%20gourd%20and%20modern%20glass%2C%20naturally%20fermented%20beverage%20with%20milky%20white%20color%2C%20rustic%20African%20village%20setting%20with%20palm%20trees%20in%20background%2C%20cultural%20presentation%20with%20traditional%20elements&width=300&height=200&seq=palm-wine-nigerian-beverage&orientation=landscape',
    rating: 4.2,
    cookTime: '1 min',
    popular: false
  },
  {
    id: 28,
    name: 'Tiger Nut Drink',
    region: 'Nigerian',
    category: 'Beverages',
    price: '$6.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Creamy%20Nigerian%20tiger%20nut%20drink%20in%20tall%20glass%20with%20smooth%20beige%20color%2C%20garnished%20with%20tiger%20nuts%2C%20dates%2C%20coconut%20shavings%2C%20and%20cinnamon%20stick%2C%20healthy%20beverage%20presentation%20with%20nutritious%20ingredients%20displayed%20around%20the%20glass&width=300&height=200&seq=tiger-nut-drink-beverage&orientation=landscape',
    rating: 4.4,
    cookTime: '2 mins',
    popular: false
  },
  {
    id: 29,
    name: 'Tropical Fruit Smoothie',
    region: 'Intercontinental',
    category: 'Beverages',
    price: '$8.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Tropical%20fruit%20smoothie%20in%20tall%20glass%20with%20vibrant%20orange-yellow%20color%2C%20made%20with%20mango%2C%20pineapple%2C%20and%20banana%2C%20topped%20with%20granola%20and%20coconut%20flakes%2C%20garnished%20with%20fresh%20fruit%20pieces%20and%20colorful%20straws%2C%20healthy%20beverage%20presentation&width=300&height=200&seq=tropical-fruit-smoothie-beverage&orientation=landscape',
    rating: 4.7,
    cookTime: '3 mins',
    popular: true
  },
  {
    id: 30,
    name: 'Iced Coffee',
    region: 'Intercontinental',
    category: 'Beverages',
    price: '$4.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Iced%20coffee%20in%20tall%20glass%20with%20ice%20cubes%2C%20cold%20brew%20coffee%20with%20creamy%20milk%20swirl%2C%20vanilla%20syrup%2C%20topped%20with%20whipped%20cream%2C%20coffee%20shop%20presentation%20with%20coffee%20beans%20scattered%20around%2C%20condensation%20on%20glass%20with%20elegant%20styling&width=300&height=200&seq=iced-coffee-beverage&orientation=landscape',
    rating: 4.5,
    cookTime: '2 mins',
    popular: true
  },
  {
    id: 31,
    name: 'Fresh Lemonade',
    region: 'Intercontinental',
    category: 'Beverages',
    price: '$4.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Fresh%20lemonade%20in%20tall%20glass%20pitcher%20and%20glasses%20with%20ice%20cubes%2C%20bright%20yellow%20color%2C%20garnished%20with%20lemon%20slices%2C%20fresh%20mint%20leaves%2C%20sparkling%20water%20bubbles%2C%20summer%20beverage%20presentation%20with%20condensation%20droplets%20on%20glass&width=300&height=200&seq=fresh-lemonade-beverage&orientation=landscape',
    rating: 4.3,
    cookTime: '2 mins',
    popular: false
  },
  {
    id: 32,
    name: 'Hot Chocolate',
    region: 'Intercontinental',
    category: 'Beverages',
    price: '$5.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Rich%20hot%20chocolate%20in%20ceramic%20mug%20with%20generous%20whipped%20cream%20topping%2C%20mini%20marshmallows%2C%20chocolate%20shavings%2C%20cozy%20cafe%20presentation%20with%20steam%20rising%2C%20cocoa%20powder%20dusting%2C%20warm%20lighting%20and%20comfort%20beverage%20styling&width=300&height=200&seq=hot-chocolate-beverage&orientation=landscape',
    rating: 4.6,
    cookTime: '3 mins',
    popular: true
  },
  {
    id: 33,
    name: 'Vanilla Milkshake',
    region: 'Intercontinental',
    category: 'Beverages',
    price: '$7.99',
    spiceLevel: 'Mild',
    image: 'https://readdy.ai/api/search-image?query=Thick%20vanilla%20milkshake%20in%20tall%20glass%20with%20whipped%20cream%20topping%2C%20maraschino%20cherry%2C%20striped%20paper%20straw%2C%20classic%20American%20diner%20presentation%20with%20condensation%20droplets%20on%20glass%2C%20retro%20soda%20fountain%20styling&width=300&height=200&seq=vanilla-milkshake-beverage&orientation=landscape',
    rating: 4.4,
    cookTime: '3 mins',
    popular: true
  }
];

export default function OrderingFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('All Levels');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = featuredDishes.filter(dish => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All Regions' || dish.region === selectedRegion;
    const matchesSpiceLevel = selectedSpiceLevel === 'All Levels' || dish.spiceLevel === selectedSpiceLevel;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (selectedPriceRange !== 'All Prices') {
      const price = parseFloat(dish.price.replace('$', ''));
      switch (selectedPriceRange) {
        case '$10-20':
          matchesPrice = price >= 10 && price <= 20;
          break;
        case '$20-30':
          matchesPrice = price >= 20 && price <= 30;
          break;
        case '$30-40':
          matchesPrice = price >= 30 && price <= 40;
          break;
        case '$40+':
          matchesPrice = price >= 40;
          break;
      }
    }
    
    return matchesCategory && matchesRegion && matchesSpiceLevel && matchesPrice && matchesSearch;
  });

  return (
    <section className="py-20 bg-white" data-product-shop>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Order Your Favorites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our smart filters to find exactly what you're craving. 
            Filter by region, spice level, price, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for dishes, ingredients, or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none pl-14"
            />
            <i className="ri-search-line absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none pr-8"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none pr-8"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Spice Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Spice Level</label>
              <div className="relative">
                <select
                  value={selectedSpiceLevel}
                  onChange={(e) => setSelectedSpiceLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance- none pr-8"
                >
                  {spiceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance- none pr-8"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredDishes.length} of {featuredDishes.length} dishes
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover object-top"
                />
                {dish.popular && (
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-500 mr-1 text-sm"></i>
                    <span className="text-sm font-semibold text-gray-900">{dish.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-600 font-semibold">{dish.region}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    dish.spiceLevel === 'Hot' || dish.spiceLevel === 'Extra Hot' ? 'bg-red-100 text-red-800' :
                    dish.spiceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {dish.spiceLevel}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dish.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">{dish.price}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <i className="ri-time-line mr-1"></i>
                    {dish.cookTime}
                  </span>
                </div>
                
                <Button className="w-full">
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No dishes found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  );
}
