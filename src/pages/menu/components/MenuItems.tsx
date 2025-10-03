
import { useState } from 'react';
import Button from '../../../components/base/Button';
import OrderModal from './OrderModal';

const menuItems = [
  // Nigerian Dishes - Complete List
  {
    id: 1,
    name: 'Jollof Rice with Grilled Chicken',
    region: 'Nigerian',
    description: 'Nigeria\'s signature dish - aromatic rice cooked in tomato sauce with spices, served with perfectly grilled chicken',
    price: '$18.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20jollof%20rice%20with%20perfectly%20grilled%20chicken%2C%20served%20with%20fried%20plantains%20and%20coleslaw%2C%20vibrant%20orange%20rice%20with%20traditional%20Nigerian%20spices%2C%20professional%20food%20photography%20with%20warm%20lighting&width=300&height=200&seq=nigerian-jollof&orientation=landscape',
    rating: 4.9,
    cookTime: '25 mins',
    popular: true,
    ingredients: ['Rice', 'Chicken', 'Tomatoes', 'Plantains', 'Nigerian Spices']
  },
  {
    id: 2,
    name: 'Pounded Yam with Egusi Soup',
    region: 'Nigerian',
    description: 'Traditional pounded yam served with rich egusi soup made with melon seeds, vegetables, and assorted meat',
    price: '$22.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20pounded%20yam%20with%20rich%20egusi%20soup%20containing%20melon%20seeds%2C%20spinach%2C%20assorted%20meat%20and%20fish%2C%20authentic%20presentation%20in%20clay%20bowls&width=300&height=200&seq=pounded-yam-egusi&orientation=landscape',
    rating: 4.8,
    cookTime: '35 mins',
    popular: true,
    ingredients: ['Yam', 'Egusi Seeds', 'Spinach', 'Assorted Meat', 'Palm Oil']
  },
  {
    id: 3,
    name: 'Nigerian Suya Platter',
    region: 'Grilled Specialties',
    description: 'Spicy grilled beef skewers coated with traditional yaji spice blend, served with onions, tomatoes, and cucumber',
    price: '$16.99',
    spiceLevel: 'Hot',
    dietary: ['Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20suya%20beef%20skewers%20with%20traditional%20yaji%20spice%20coating%20on%20wooden%20sticks%2C%20served%20with%20sliced%20onions%2C%20tomatoes%2C%20and%20cucumber%20on%20banana%20leaves%2C%20authentic%20street%20food%20presentation&width=300&height=200&seq=nigerian-suya&orientation=landscape',
    rating: 4.9,
    cookTime: '15 mins',
    popular: true,
    ingredients: ['Beef', 'Yaji Spice', 'Onions', 'Tomatoes', 'Cucumber']
  },
  {
    id: 4,
    name: 'Pepper Soup with Catfish',
    region: 'Nigerian',
    description: 'Spicy and aromatic Nigerian pepper soup with fresh catfish, perfect for warming the soul',
    price: '$19.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20pepper%20soup%20with%20fresh%20catfish%20in%20clear%20spicy%20broth%2C%20served%20in%20traditional%20clay%20pot%20with%20scent%20leaves&width=300&height=200&seq=pepper-soup-catfish&orientation=landscape',
    rating: 4.7,
    cookTime: '20 mins',
    popular: false,
    ingredients: ['Catfish', 'Pepper Soup Spice', 'Scent Leaves', 'Hot Peppers', 'Ginger']
  },
  {
    id: 5,
    name: 'Fried Rice Nigerian Style',
    region: 'Nigerian',
    description: 'Colorful fried rice with mixed vegetables, shrimp, and chicken, Nigerian style with perfect seasoning',
    price: '$17.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20style%20fried%20rice%20with%20colorful%20mixed%20vegetables%2C%20shrimp%2C%20chicken%20pieces%2C%20green%20peas%2C%20and%20carrots%2C%20vibrant%20presentation%20in%20elegant%20serving%20dish%20with%20Nigerian%20styling&width=300&height=200&seq=nigerian-fried-rice&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: false,
    ingredients: ['Rice', 'Shrimp', 'Chicken', 'Mixed Vegetables', 'Nigerian Curry']
  },
  {
    id: 6,
    name: 'Moi Moi (Steamed Bean Pudding)',
    region: 'Nigerian',
    description: 'Traditional steamed bean pudding made with black-eyed peas, spices, and optional fish or egg',
    price: '$12.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Vegetarian Option'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20moi%20moi%20steamed%20bean%20pudding%20wrapped%20in%20leaves%2C%20golden%20yellow%20color%20with%20chunks%20of%20fish%20and%20egg&width=300&height=200&seq=moi-moi-bean-pudding&orientation=landscape',
    rating: 4.6,
    cookTime: '45 mins',
    popular: true,
    ingredients: ['Black-eyed Peas', 'Fish', 'Eggs', 'Peppers', 'Palm Oil']
  },
  {
    id: 7,
    name: 'Amala with Ewedu Soup',
    region: 'Nigerian',
    description: 'Traditional Yoruba dish of yam flour served with ewedu (jute leaves) soup and gbegiri',
    price: '$20.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20amala%20with%20ewedu%20soup%20and%20gbegiri%2C%20traditional%20Yoruba%20presentation%20with%20assorted%20meat&width=300&height=200&seq=amala-ewedu&orientation=landscape',
    rating: 4.5,
    cookTime: '30 mins',
    popular: false,
    ingredients: ['Yam Flour', 'Ewedu Leaves', 'Gbegiri', 'Assorted Meat', 'Locust Beans']
  },
  {
    id: 8,
    name: 'Ofada Rice with Ayamase Sauce',
    region: 'Nigerian',
    description: 'Local Nigerian rice served with spicy green pepper sauce (ayamase) and assorted meat',
    price: '$21.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20ofada%20rice%20with%20green%20ayamase%20sauce%2C%20served%20with%20assorted%20meat%20and%20boiled%20eggs&width=300&height=200&seq=ofada-rice-ayamase&orientation=landscape',
    rating: 4.7,
    cookTime: '35 mins',
    popular: true,
    ingredients: ['Ofada Rice', 'Green Peppers', 'Assorted Meat', 'Palm Oil', 'Locust Beans']
  },
  {
    id: 9,
    name: 'Akara (Bean Cakes)',
    region: 'Nigerian',
    description: 'Deep-fried bean cakes made from black-eyed peas, served with bread or pap',
    price: '$8.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Vegetarian'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20akara%20bean%20cakes%20golden%20brown%20and%20crispy%2C%20served%20with%20bread%20and%20pap&width=300&height=200&seq=akara-bean-cakes&orientation=landscape',
    rating: 4.4,
    cookTime: '15 mins',
    popular: false,
    ingredients: ['Black-eyed Peas', 'Onions', 'Peppers', 'Salt', 'Oil']
  },
  {
    id: 10,
    name: 'Plantain Porridge',
    region: 'Nigerian',
    description: 'Unripe plantains cooked in palm oil with vegetables, fish, and traditional spices',
    price: '$15.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20plantain%20porridge%20with%20unripe%20plantains%2C%20vegetables%2C%20fish%20and%20palm%20oil&width=300&height=200&seq=plantain-porridge&orientation=landscape',
    rating: 4.3,
    cookTime: '25 mins',
    popular: false,
    ingredients: ['Unripe Plantains', 'Palm Oil', 'Fish', 'Vegetables', 'Crayfish']
  },
  {
    id: 11,
    name: 'Banga Soup with Starch',
    region: 'Nigerian',
    description: 'Palm nut soup served with starch, a Delta State specialty with fresh fish and meat',
    price: '$23.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20banga%20soup%20with%20palm%20nuts%2C%20served%20with%20white%20starch%20and%20fresh%20fish&width=300&height=200&seq=banga-soup-starch&orientation=landscape',
    rating: 4.6,
    cookTime: '40 mins',
    popular: false,
    ingredients: ['Palm Nuts', 'Starch', 'Fresh Fish', 'Meat', 'Banga Spice']
  },
  {
    id: 12,
    name: 'Tuwo Shinkafa with Miyan Kuka',
    region: 'Nigerian',
    description: 'Northern Nigerian rice pudding served with baobab leaf soup',
    price: '$19.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20tuwo%20shinkafa%20rice%20pudding%20with%20miyan%20kuka%20baobab%20leaf%20soup&width=300&height=200&seq=tuwo-miyan-kuka&orientation=landscape',
    rating: 4.4,
    cookTime: '35 mins',
    popular: false,
    ingredients: ['Rice', 'Baobab Leaves', 'Meat', 'Fish', 'Groundnut Oil']
  },
  {
    id: 13,
    name: 'Nkwobi (Spiced Cow Foot)',
    region: 'Nigerian',
    description: 'Igbo delicacy of spiced cow foot in palm oil sauce with utazi leaves',
    price: '$24.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20nkwobi%20spiced%20cow%20foot%20with%20palm%20oil%20sauce%20and%20utazi%20leaves&width=300&height=200&seq=nkwobi-cow-foot&orientation=landscape',
    rating: 4.8,
    cookTime: '60 mins',
    popular: true,
    ingredients: ['Cow Foot', 'Palm Oil', 'Utazi Leaves', 'Potash', 'Stockfish']
  },
  {
    id: 14,
    name: 'Abacha (African Salad)',
    region: 'Nigerian',
    description: 'Igbo traditional salad made with dried cassava, vegetables, and protein',
    price: '$16.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20abacha%20African%20salad%20with%20dried%20cassava%2C%20vegetables%2C%20and%20stockfish&width=300&height=200&seq=abacha-african-salad&orientation=landscape',
    rating: 4.5,
    cookTime: '20 mins',
    popular: false,
    ingredients: ['Dried Cassava', 'Stockfish', 'Vegetables', 'Palm Oil', 'Ugba']
  },
  {
    id: 15,
    name: 'Oha Soup',
    region: 'Nigerian',
    description: 'Traditional Igbo soup made with oha leaves, assorted meat, and cocoyam paste',
    price: '$22.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20oha%20soup%20with%20oha%20leaves%2C%20assorted%20meat%2C%20and%20cocoyam%20paste&width=300&height=200&seq=oha-soup&orientation=landscape',
    rating: 4.7,
    cookTime: '45 mins',
    popular: true,
    ingredients: ['Oha Leaves', 'Assorted Meat', 'Cocoyam', 'Stockfish', 'Palm Oil']
  },
  {
    id: 16,
    name: 'Nsala Soup (White Soup)',
    region: 'Nigerian',
    description: 'Igbo white soup made without palm oil, with catfish and yam',
    price: '$21.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20nsala%20white%20soup%20with%20catfish%20and%20yam%2C%20clear%20broth&width=300&height=200&seq=white-soup-nsala&orientation=landscape',
    rating: 4.6,
    cookTime: '35 mins',
    popular: false,
    ingredients: ['Catfish', 'Yam', 'Uziza Leaves', 'Stockfish', 'Crayfish']
  },
  {
    id: 17,
    name: 'Okro Soup',
    region: 'Nigerian',
    description: 'Popular Nigerian soup made with okra, assorted meat, and seafood',
    price: '$18.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20okro%20soup%20with%20fresh%20okra%2C%20assorted%20meat%20and%20seafood&width=300&height=200&seq=okro-soup&orientation=landscape',
    rating: 4.5,
    cookTime: '30 mins',
    popular: true,
    ingredients: ['Okra', 'Assorted Meat', 'Seafood', 'Palm Oil', 'Stockfish']
  },
  {
    id: 18,
    name: 'Afang Soup',
    region: 'Nigerian',
    description: 'Cross River State delicacy made with afang leaves and waterleaf',
    price: '$23.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20afang%20soup%20with%20afang%20leaves%2C%20waterleaf&width=300&height=200&seq=afang-soup&orientation=landscape',
    rating: 4.8,
    cookTime: '50 mins',
    popular: true,
    ingredients: ['Afang Leaves', 'Waterleaf', 'Assorted Meat', 'Seafood', 'Palm Oil']
  },
  {
    id: 19,
    name: 'Fisherman Soup',
    region: 'Nigerian',
    description: 'Rivers State specialty with fresh fish, yam, and native spices',
    price: '$25.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20fisherman%20soup%20with%20fresh%20fish%2C%20yam%20and%20native%20spices&width=300&height=200&seq=fisherman-soup&orientation=landscape',
    rating: 4.7,
    cookTime: '35 mins',
    popular: false,
    ingredients: ['Fresh Fish', 'Yam', 'Native Spices', 'Scent Leaves', 'Palm Oil']
  },
  {
    id: 20,
    name: 'Edikang Ikong Soup',
    region: 'Nigerian',
    description: 'Nutritious vegetable soup with waterleaf, fluted pumpkin leaves, and assorted meat',
    price: '$22.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20edikang%20ikong%20vegetable%20soup%20with%20waterleaf%20and%20pumpkin%20leaves&width=300&height=200&seq=edikang-ikong&orientation=landscape',
    rating: 4.6,
    cookTime: '30 mins',
    popular: true,
    ingredients: ['Waterleaf', 'Pumpkin Leaves', 'Assorted Meat', 'Fish', 'Palm Oil']
  },

  // Intercontinental Dishes - Complete List
  {
    id: 21,
    name: 'Grilled Salmon with Lemon Butter',
    region: 'Intercontinental',
    description: 'Fresh Atlantic salmon grilled to perfection, served with lemon butter sauce, roasted vegetables, and rice pilaf',
    price: '$28.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free', 'Keto-Friendly'],
    image: 'https://readdy.ai/api/search-image?query=Elegant%20grilled%20salmon%20fillet%20with%20golden%20lemon%20butter%20sauce%2C%20roasted%20vegetables%20and%20rice%20pilaf%20on%20white%20plate%2C%20fine%20dining%20presentation%20with%20fresh%20herbs%20and%20lemon%20garnish&width=300&height=200&seq=grilled-salmon&orientation=landscape',
    rating: 4.8,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Salmon', 'Lemon', 'Butter', 'Mixed Vegetables', 'Rice']
  },
  {
    id: 22,
    name: 'Chicken Alfredo Pasta',
    region: 'Intercontinental',
    description: 'Creamy fettuccine pasta with grilled chicken in rich alfredo sauce, topped with parmesan',
    price: '$24.99',
    spiceLevel: 'Mild',
    dietary: ['Contains Dairy'],
    image: 'https://readdy.ai/api/search-image?query=Creamy%20chicken%20alfredo%20pasta%20with%20fettuccine%20noodles%2C%20grilled%20chicken%20strips%2C%20rich%20white%20sauce%2C%20parmesan%20cheese%2C%20elegant%20restaurant%20plating%20with%20fresh%20basil&width=300&height=200&seq=chicken-alfredo&orientation=landscape',
    rating: 4.7,
    cookTime: '18 mins',
    popular: true,
    ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan', 'Garlic']
  },
  {
    id: 23,
    name: 'Beef Stroganoff',
    region: 'Intercontinental',
    description: 'Tender beef strips in creamy mushroom sauce served over egg noodles',
    price: '$26.99',
    spiceLevel: 'Mild',
    dietary: ['Contains Dairy'],
    image: 'https://readdy.ai/api/search-image?query=Classic%20beef%20stroganoff%20with%20tender%20beef%20strips%20in%20creamy%20mushroom%20sauce%20over%20egg%20noodles%2C%20elegant%20presentation%20with%20fresh%20parsley%20garnish&width=300&height=200&seq=beef-stroganoff&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: false,
    ingredients: ['Beef', 'Mushrooms', 'Cream', 'Egg Noodles', 'Onions']
  },
  {
    id: 24,
    name: 'Mediterranean Quinoa Bowl',
    region: 'Intercontinental',
    description: 'Healthy quinoa bowl with grilled vegetables, feta cheese, and lemon-herb dressing',
    price: '$19.99',
    spiceLevel: 'Mild',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Mediterranean%20quinoa%20bowl%20with%20colorful%20grilled%20vegetables%2C%20feta%20cheese%2C%20olives%2C%20tomatoes%2C%20healthy%20presentation%20with%20lemon%20herb%20dressing&width=300&height=200&seq=quinoa-bowl&orientation=landscape',
    rating: 4.5,
    cookTime: '15 mins',
    popular: true,
    ingredients: ['Quinoa', 'Feta Cheese', 'Vegetables', 'Olives', 'Lemon']
  },
  {
    id: 25,
    name: 'Chicken Teriyaki',
    region: 'Intercontinental',
    description: 'Grilled chicken glazed with teriyaki sauce, served with steamed rice and vegetables',
    price: '$22.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Japanese%20chicken%20teriyaki%20with%20glossy%20glaze%2C%20steamed%20rice%20and%20colorful%20vegetables%2C%20traditional%20presentation%20with%20sesame%20seeds&width=300&height=200&seq=chicken-teriyaki&orientation=landscape',
    rating: 4.7,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Chicken', 'Teriyaki Sauce', 'Rice', 'Vegetables', 'Sesame']
  },
  {
    id: 26,
    name: 'Fish and Chips',
    region: 'Intercontinental',
    description: 'Classic British beer-battered fish with crispy chips and mushy peas',
    price: '$21.99',
    spiceLevel: 'Mild',
    dietary: ['Contains Gluten'],
    image: 'https://readdy.ai/api/search-image?query=Classic%20British%20fish%20and%20chips%20with%20golden%20beer%20battered%20fish%2C%20thick%20cut%20chips%2C%20mushy%20peas%2C%20served%20on%20newspaper%20with%20lemon%20wedge&width=300&height=200&seq=fish-chips&orientation=landscape',
    rating: 4.4,
    cookTime: '18 mins',
    popular: false,
    ingredients: ['Fish', 'Potatoes', 'Beer Batter', 'Peas', 'Oil']
  },
  {
    id: 27,
    name: 'Margherita Pizza',
    region: 'Intercontinental',
    description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
    price: '$16.99',
    spiceLevel: 'Mild',
    dietary: ['Vegetarian'],
    image: 'https://readdy.ai/api/search-image?query=Classic%20margherita%20pizza%20with%20fresh%20mozzarella%2C%20tomato%20sauce%2C%20fresh%20basil%20leaves%2C%20wood%20fired%20oven%20style%20with%20charred%20crust&width=300&height=200&seq=margherita-pizza&orientation=landscape',
    rating: 4.6,
    cookTime: '12 mins',
    popular: true,
    ingredients: ['Pizza Dough', 'Mozzarella', 'Tomato Sauce', 'Basil', 'Olive Oil']
  },
  {
    id: 28,
    name: 'Caesar Salad',
    region: 'Intercontinental',
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: '$14.99',
    spiceLevel: 'Mild',
    dietary: ['Vegetarian'],
    image: 'https://readdy.ai/api/search-image?query=Fresh%20caesar%20salad%20with%20crisp%20romaine%20lettuce%2C%20golden%20croutons%2C%20parmesan%20cheese%20shavings%2C%20classic%20presentation%20with%20caesar%20dressing&width=300&height=200&seq=caesar-salad&orientation=landscape',
    rating: 4.3,
    cookTime: '8 mins',
    popular: false,
    ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan', 'Anchovies']
  },
  {
    id: 29,
    name: 'Pad Thai',
    region: 'Intercontinental',
    description: 'Thai stir-fried noodles with shrimp, tofu, bean sprouts, and tamarind sauce',
    price: '$20.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free Option'],
    image: 'https://readdy.ai/api/search-image?query=Authentic%20pad%20thai%20with%20rice%20noodles%2C%20shrimp%2C%20tofu%2C%20bean%20sprouts%2C%20peanuts%2C%20lime%20wedge%2C%20traditional%20Thai%20presentation&width=300&height=200&seq=pad-thai&orientation=landscape',
    rating: 4.8,
    cookTime: '15 mins',
    popular: true,
    ingredients: ['Rice Noodles', 'Shrimp', 'Tofu', 'Bean Sprouts', 'Tamarind']
  },
  {
    id: 30,
    name: 'Chicken Tikka Masala',
    region: 'Intercontinental',
    description: 'Tender chicken in creamy tomato-based curry sauce, served with basmati rice',
    price: '$23.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Contains Dairy'],
    image: 'https://readdy.ai/api/search-image?query=Chicken%20tikka%20masala%20with%20tender%20chicken%20pieces%20in%20rich%20creamy%20tomato%20curry%20sauce%2C%20served%20with%20basmati%20rice%20and%20naan%20bread&width=300&height=200&seq=tikka-masala&orientation=landscape',
    rating: 4.7,
    cookTime: '22 mins',
    popular: true,
    ingredients: ['Chicken', 'Tomato Sauce', 'Cream', 'Indian Spices', 'Rice']
  },
  {
    id: 31,
    name: 'Greek Moussaka',
    region: 'Intercontinental',
    description: 'Layered eggplant casserole with ground beef and béchamel sauce',
    price: '$25.99',
    spiceLevel: 'Mild',
    dietary: ['Contains Dairy'],
    image: 'https://readdy.ai/api/search-image?query=Greek%20moussaka%20with%20layers%20of%20eggplant%2C%20ground%20beef%2C%20bechamel%20sauce%2C%20golden%20baked%20top%2C%20traditional%20Mediterranean%20presentation&width=300&height=200&seq=greek-moussaka&orientation=landscape',
    rating: 4.5,
    cookTime: '45 mins',
    popular: false,
    ingredients: ['Eggplant', 'Ground Beef', 'Béchamel', 'Cheese', 'Herbs']
  },
  {
    id: 32,
    name: 'Sushi Platter',
    region: 'Intercontinental',
    description: 'Assorted sushi rolls and nigiri with wasabi, ginger, and soy sauce',
    price: '$32.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free', 'Contains Fish'],
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20sushi%20platter%20with%20assorted%20rolls%20and%20nigiri%2C%20wasabi%2C%20pickled%20ginger%2C%20soy%20sauce%2C%20elegant%20Japanese%20presentation%20on%20black%20slate&width=300&height=200&seq=sushi-platter&orientation=landscape',
    rating: 4.9,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Sushi Rice', 'Fresh Fish', 'Nori', 'Wasabi', 'Ginger']
  },
  {
    id: 33,
    name: 'Thai Green Curry',
    region: 'Intercontinental',
    description: 'Spicy Thai curry with coconut milk, vegetables, and jasmine rice',
    price: '$24.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Vegetarian Option'],
    image: 'https://readdy.ai/api/search-image?query=Thai%20green%20curry%20with%20coconut%20milk%2C%20fresh%20vegetables%2C%20thai%20basil%2C%20served%20with%20jasmine%20rice%2C%20authentic%20Thai%20presentation%20in%20traditional%20bowl&width=300&height=200&seq=thai-green-curry&orientation=landscape',
    rating: 4.7,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Green Curry Paste', 'Coconut Milk', 'Vegetables', 'Rice', 'Thai Basil']
  },
  {
    id: 34,
    name: 'French Ratatouille',
    region: 'Intercontinental',
    description: 'Traditional Provençal vegetable stew with herbs de Provence',
    price: '$18.99',
    spiceLevel: 'Mild',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=French%20ratatouille%20with%20colorful%20vegetables%20arranged%20in%20rustic%20style%2C%20eggplant%2C%20zucchini%2C%20tomatoes%2C%20bell%20peppers%2C%20herbs%20de%20provence&width=300&height=200&seq=ratatouille&orientation=landscape',
    rating: 4.4,
    cookTime: '35 mins',
    popular: false,
    ingredients: ['Eggplant', 'Zucchini', 'Tomatoes', 'Bell Peppers', 'Herbs']
  },
  {
    id: 35,
    name: 'Mexican Burrito Bowl',
    region: 'Intercontinental',
    description: 'Rice bowl with black beans, grilled chicken, salsa, and avocado',
    price: '$17.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Mexican%20burrito%20bowl%20with%20cilantro%20lime%20rice%2C%20black%20beans%2C%20grilled%20chicken%2C%20fresh%20salsa%2C%20avocado%2C%20colorful%20presentation&width=300&height=200&seq=burrito-bowl&orientation=landscape',
    rating: 4.6,
    cookTime: '15 mins',
    popular: true,
    ingredients: ['Rice', 'Black Beans', 'Chicken', 'Salsa', 'Avocado']
  },

  // Grilled Specialties - Complete List
  {
    id: 41,
    name: 'Grilled Tilapia Fish',
    region: 'Grilled Specialties',
    description: 'Fresh tilapia fish grilled with Nigerian spices, served with jollof rice and plantains',
    price: '$24.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20Nigerian%20tilapia%20fish%20with%20traditional%20spices%2C%20served%20with%20jollof%20rice%20and%20fried%20plantains%2C%20authentic%20Nigerian%20presentation%20with%20pepper%20sauce&width=300&height=200&seq=grilled-tilapia-nigerian&orientation=landscape',
    rating: 4.8,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Tilapia Fish', 'Nigerian Spices', 'Jollof Rice', 'Plantains', 'Pepper']
  },
  {
    id: 42,
    name: 'BBQ Ribs',
    region: 'Grilled Specialties',
    description: 'Slow-cooked pork ribs with smoky BBQ sauce, served with coleslaw and fries',
    price: '$29.99',
    spiceLevel: 'Medium',
    dietary: ['Contains Gluten'],
    image: 'https://readdy.ai/api/search-image?query=BBQ%20pork%20ribs%20with%20smoky%20glaze%2C%20coleslaw%20and%20french%20fries%2C%20American%20barbecue%20style%20presentation%20with%20BBQ%20sauce&width=300&height=200&seq=bbq-ribs&orientation=landscape',
    rating: 4.7,
    cookTime: '90 mins',
    popular: true,
    ingredients: ['Pork Ribs', 'BBQ Sauce', 'Coleslaw', 'Fries', 'Spices']
  },
  {
    id: 43,
    name: 'Grilled Chicken Wings',
    region: 'Grilled Specialties',
    description: 'Juicy chicken wings grilled with spicy marinade, served with ranch dip',
    price: '$18.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20chicken%20wings%20with%20spicy%20marinade%2C%20golden%20brown%20color%2C%20served%20with%20ranch%20dipping%20sauce%20and%20celery%20sticks&width=300&height=200&seq=grilled-wings&orientation=landscape',
    rating: 4.6,
    cookTime: '25 mins',
    popular: true,
    ingredients: ['Chicken Wings', 'Spicy Marinade', 'Ranch Dip', 'Celery', 'Hot Sauce']
  },
  {
    id: 44,
    name: 'Grilled Lamb Chops',
    region: 'Grilled Specialties',
    description: 'Tender lamb chops marinated in herbs, grilled to perfection with mint sauce',
    price: '$34.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20lamb%20chops%20with%20herb%20marinade%2C%20perfectly%20cooked%20with%20grill%20marks%2C%20served%20with%20mint%20sauce%20and%20roasted%20vegetables&width=300&height=200&seq=lamb-chops&orientation=landscape',
    rating: 4.9,
    cookTime: '15 mins',
    popular: true,
    ingredients: ['Lamb Chops', 'Herbs', 'Mint Sauce', 'Garlic', 'Olive Oil']
  },
  {
    id: 45,
    name: 'Grilled Shrimp Skewers',
    region: 'Grilled Specialties',
    description: 'Large shrimp marinated in garlic and herbs, grilled on skewers',
    price: '$26.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Keto-Friendly'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20shrimp%20skewers%20with%20garlic%20herb%20marinade%2C%20perfectly%20cooked%20on%20wooden%20skewers%20with%20lemon%20wedges%20and%20herbs&width=300&height=200&seq=shrimp-skewers&orientation=landscape',
    rating: 4.7,
    cookTime: '12 mins',
    popular: false,
    ingredients: ['Large Shrimp', 'Garlic', 'Herbs', 'Lemon', 'Olive Oil']
  },
  {
    id: 46,
    name: 'Grilled Vegetable Platter',
    region: 'Grilled Specialties',
    description: 'Assorted seasonal vegetables grilled with balsamic glaze',
    price: '$19.99',
    spiceLevel: 'Mild',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20vegetable%20platter%20with%20colorful%20seasonal%20vegetables%2C%20balsamic%20glaze%2C%20zucchini%2C%20bell%20peppers%2C%20eggplant%2C%20asparagus&width=300&height=200&seq=grilled-vegetables&orientation=landscape',
    rating: 4.4,
    cookTime: '18 mins',
    popular: false,
    ingredients: ['Mixed Vegetables', 'Balsamic Glaze', 'Olive Oil', 'Herbs', 'Garlic']
  },
  {
    id: 47,
    name: 'Grilled Steak',
    region: 'Grilled Specialties',
    description: 'Premium ribeye steak grilled to your preference, served with garlic butter',
    price: '$39.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free', 'Keto-Friendly'],
    image: 'https://readdy.ai/api/search-image?query=Premium%20grilled%20ribeye%20steak%20with%20perfect%20grill%20marks%2C%20garlic%20butter%2C%20served%20with%20roasted%20potatoes%20and%20asparagus&width=300&height=200&seq=grilled-steak&orientation=landscape',
    rating: 4.9,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Ribeye Steak', 'Garlic Butter', 'Black Pepper', 'Salt', 'Herbs']
  },
  {
    id: 48,
    name: 'Grilled Pork Tenderloin',
    region: 'Grilled Specialties',
    description: 'Lean pork tenderloin with apple cider glaze and roasted vegetables',
    price: '$27.99',
    spiceLevel: 'Mild',
    dietary: ['Gluten-Free'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20pork%20tenderloin%20with%20apple%20cider%20glaze%2C%20sliced%20and%20served%20with%20colorful%20roasted%20vegetables&width=300&height=200&seq=pork-tenderloin&orientation=landscape',
    rating: 4.5,
    cookTime: '25 mins',
    popular: false,
    ingredients: ['Pork Tenderloin', 'Apple Cider', 'Vegetables', 'Thyme', 'Garlic']
  },
  {
    id: 49,
    name: 'Grilled Catfish Nigerian Style',
    region: 'Grilled Specialties',
    description: 'Fresh catfish grilled with Nigerian pepper sauce and served with yam',
    price: '$23.99',
    spiceLevel: 'Hot',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20Nigerian%20catfish%20with%20spicy%20pepper%20sauce%2C%20served%20with%20boiled%20yam%20and%20traditional%20Nigerian%20sides&width=300&height=200&seq=grilled-catfish-nigerian&orientation=landscape',
    rating: 4.8,
    cookTime: '18 mins',
    popular: true,
    ingredients: ['Catfish', 'Nigerian Pepper Sauce', 'Yam', 'Onions', 'Spices']
  },
  {
    id: 50,
    name: 'Mixed Grill Platter',
    region: 'Grilled Specialties',
    description: 'Combination of grilled chicken, beef, lamb, and sausages with sides',
    price: '$42.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Mixed%20grill%20platter%20with%20grilled%20chicken%2C%20beef%2C%20lamb%20chops%2C%20sausages%2C%20served%20with%20various%20sides%20and%20sauces&width=300&height=200&seq=mixed-grill&orientation=landscape',
    rating: 4.8,
    cookTime: '30 mins',
    popular: true,
    ingredients: ['Chicken', 'Beef', 'Lamb', 'Sausages', 'Mixed Sides']
  }
];

const spiceLevels = [
  { value: 'Mild', label: 'Mild', icon: 'ri-fire-line', color: 'green' },
  { value: 'Medium', label: 'Medium', icon: 'ri-fire-fill', color: 'yellow' },
  { value: 'Hot', label: 'Hot', icon: 'ri-fire-fill', color: 'orange' },
  { value: 'Extra Hot', label: 'Extra Hot', icon: 'ri-fire-fill', color: 'red' }
];

interface MenuItemsProps {
  selectedCategory: string;
}

export default function MenuItems({ selectedCategory }: MenuItemsProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [itemSpiceLevels, setItemSpiceLevels] = useState<{[key: number]: string}>({});

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => 
        item.region === selectedCategory || 
        (selectedCategory === 'Popular' && item.popular)
      );

  const handleAddToCart = (item: any) => {
    const selectedSpiceLevel = itemSpiceLevels[item.id] || item.spiceLevel;
    setSelectedItem({...item, selectedSpiceLevel});
    setShowOrderModal(true);
  };

  const getSpiceColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSpiceLevelChange = (itemId: number, spiceLevel: string) => {
    setItemSpiceLevels(prev => ({
      ...prev,
      [itemId]: spiceLevel
    }));
  };

  return (
    <>
      <section className="py-8 bg-gray-50" data-menu-items>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const currentSpiceLevel = itemSpiceLevels[item.id] || item.spiceLevel;
              const spiceLevelData = spiceLevels.find(level => level.value === currentSpiceLevel) || spiceLevels[0];
              
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Item Image - Made Larger and Complete */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                    {item.popular && (
                      <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Item Details - More Compact */}
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-bold text-gray-900 flex-1 line-clamp-1">{item.name}</h3>
                      <span className="text-lg font-bold text-orange-600 ml-2">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {item.region}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <i className="ri-star-fill text-xs"></i>
                        <span className="text-xs font-medium text-gray-700 ml-1">{item.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <i className="ri-time-line text-xs"></i>
                        <span className="text-xs ml-1">{item.cookTime}</span>
                      </div>
                    </div>

                    {/* Reduced description text */}
                    <p className="text-gray-600 text-xs mb-2 line-clamp-1">{item.description}</p>

                    {/* Dietary Info - Reduced */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.dietary.slice(0, 1).map((diet: string) => (
                        <span key={diet} className="px-1 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                          {diet}
                        </span>
                      ))}
                    </div>

                    {/* Spice Level Selector - Compact */}
                    <div className="mb-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Spice:</label>
                      <div className="grid grid-cols-2 gap-1">
                        {spiceLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleSpiceLevelChange(item.id, level.value)}
                            className={`p-1 rounded border transition-all cursor-pointer flex items-center justify-center ${
                              currentSpiceLevel === level.value
                                ? `border-${level.color}-400 ${getSpiceColor(level.color)}`
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <i className={`${level.icon} text-xs ${
                              currentSpiceLevel === level.value 
                                ? getSpiceColor(level.color).split(' ')[0]
                                : 'text-gray-500'
                            }`}></i>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button - Compact */}
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm font-semibold transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrderModal && selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
}
