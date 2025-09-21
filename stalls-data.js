// All stall info lives here
const stallsData = {
  c: {
  name: "College Canteen",
  desc: "A classic spot for hearty meals and quick bites that keep students fueled all day.",
  location: "Main Building",
  time: "10-15 min",
  rating: "4.8",
  image: "img/c/c.jpg",
  popout: `
    <img src="img/c/c.jpg">
    <p>A classic spot for hearty meals and quick bites that keep students fueled all day.</p>
    <p><strong>Location:</strong>Main Building</p>
    <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
  `,
  menu: {
    Chicken: [
      { name: "Fried Chicken", desc: "Crispy golden fried chicken", price: 65, img: "img/c/friedchicken.jpg" },
      { name: "Chicken Adobo", desc: "Classic Filipino chicken adobo", price: 65, img: "img/c/adobo.jpg" },
      { name: "Chicken Cordon Bleu", desc: "Breaded chicken stuffed with ham and cheese", price: 70, img: "img/c/cordonbleu.jpg" }
    ],
    "Noodles & Pasta": [
      { name: "Pancit Malabon", desc: "Thick rice noodles with shrimp sauce", price: 50, img: "img/c/pancitmalabon.jpg" },
      { name: "Bihon Guisado", desc: "Stir-fried rice noodles with vegetables", price: 45, img: "img/c/pancitbihon.jpg" },
      { name: "Spaghetti", desc: "Classic Filipino-style spaghetti", price: 45, img: "img/c/spaghetti.jpg" }
    ],
    Kakanin: [
      { name: "Turon", desc: "Fried banana spring rolls", price: 25, img: "img/c/turon.jpg" },
      { name: "Puto", desc: "Steamed rice cakes", price: 10, img: "img/c/puto.jpg" },
      { name: "Biko", desc: "Sweet sticky rice cake", price: 25, img: "img/c/biko.jpg" }
    ]
  }
},

  d: {
  name: "Daisee's",
  desc: "Freshly baked  breads and pastries made with care for every occasion.",
  location: "Outside Old Gym",
  time: "15-20 min",
  rating: "4.6",
  image: "img/d/d.jpg",
  popout: `
    <img src="img/d/d.jpg">
    <p>Freshly baked breads and pastries made with care for every occasion.</p>
    <p><strong>Location:</strong>Outside Old Gym</p>
    <p><strong>Hours:</strong> Mon-Sun: 8AM-5PM</p>
  `,
  menu: {
    Breads: [
      { name: "Mamon", desc: "Soft and fluffy sponge cake", price: 25, img: "img/d/mamon.jpg" },
      { name: "Ensaymada", desc: "Buttery brioche with cheese and sugar", price: 35, img: "img/d/ensaymada.jpg" },
      { name: "Pandesal", desc: "Classic Filipino bread rolls", price: 5, img: "img/d/pandesal.jpg" }
    ],
    Pizzas: [
      { name: "Pepperoni Pizza", desc: "Classic pepperoni with cheese", price: 120, img: "img/d/pepperoni.jpg" },
      { name: "Hawaiian Pizza", desc: "Pineapple, ham, and cheese", price: 130, img: "img/d/hawaiian.jpg" },
      { name: "Combo Pizza", desc: "Pepperoni, ham, mushrooms, and bell peppers", price: 145, img: "img/d/combo.jpg" }
    ],
    Desserts: [
      { name: "Brownies", desc: "Rich chocolate brownies", price: 40, img: "img/d/brownie.jpg" },
      { name: "Chocolate Chip Cookies", desc: "Classic cookies with chocolate chips", price: 25, img: "img/d/chocolatechipcookie.jpg" }
    ]
  }
},

  pc: {
  name: "Potato Corner",
  desc: "Crispy, golden fries with delicious flavors loved by all ages.",
  location: "Outside Old Gym",
  time: "8-12 min",
  rating: "4.7",
  image: "img/pc/pc.jpg",
  popout: `
    <img src="img/pc/pc.jpg">
    <p>Crispy, golden fries with delicious flavors loved by all ages.</p>
    <p><strong>Location:</strong>Outside Old Gym</p>
    <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
  `,
  menu: {
    "Flavored Fries": [
      { name: "Cheese Fries", desc: "Fries with cheese powder", price: 60, img: "img/pc/cheese.png" },
      { name: "BBQ Fries", desc: "Fries with BBQ flavor", price: 60, img: "img/pc/bbq.png" },
      { name: "Sour Cream Fries", desc: "Fries with sour cream flavor", price: 60, img: "img/pc/sourcream.png" },
      { name: "Chili Cheese Fries", desc: "Spicy chili with cheese", price: 70, img: "img/pc/chilicheese.png" },
      { name: "Sweet Corn Fries", desc: "Sweet corn flavored fries", price: 60, img: "img/pc/sweetcorn.png" },
      { name: "White Cheddar Fries", desc: "Premium white cheddar flavor", price: 65, img: "img/pc/whitecheddar.png" }
    ],
    "Crunchy Chicken": [
      { name: "Solo Crunchy Chicken", desc: "Single serving of crunchy chicken", price: 75, img: "img/pc/crunchychicken.png" },
      { name: "Large Crunchy Chicken", desc: "Big serving of crunchy chicken", price: 95, img: "img/pc/crunchychicken.png" },
      { name: "Mega Crunchy Chicken", desc: "Extra large crunchy chicken", price: 199, img: "img/pc/crunchychicken.png" }
    ]
  }
},

  shs: {
  name: "SHS Canteen",
  desc: "Serving hot, crispy fries and tasty snacks that everyone loves—perfect for any time of day.",
  location: "SHS Building",
  time: "5-8 min",
  rating: "4.5",
  image: "img/shs/shs.jpg",
  popout: `
    <img src="img/shs/shs.jpg">
    <p>Serving hot, crispy fries and tasty snacks that everyone loves—perfect for any time of day.</p>
    <p><strong>Location:</strong>SHS Building</p>
    <p><strong>Hours:</strong> Mon-Thru: 8AM-5PM</p>
  `,
  menu: {
    "Breakfast Meals": [
      { name: "Longganisa Meal", desc: "Filipino sausage with garlic rice and egg", price: 70, img: "img/shs/longganisa.jpg" },
      { name: "Corned Beef Meal", desc: "Corned beef with garlic rice and egg", price: 80, img: "img/shs/cornedbeef.jpg" },
      { name: "Tocino Meal", desc: "Sweet cured pork with garlic rice and egg", price: 65, img: "img/shs/tocino.jpg" }
    ],
    "Pasta Specials": [
      { name: "Carbonara", desc: "Creamy pasta with bacon and cheese", price: 55, img: "img/shs/carbonara.jpg" },
      { name: "Baked Macaroni", desc: "Oven-baked macaroni with cheese topping", price: 50, img: "img/shs/bakedmac.jpg" },
      { name: "Sotanghon Guisado", desc: "Glass noodles with vegetables and meat", price: 50, img: "img/shs/sotanghon.jpg" }
    ],
    "Filipino Desserts": [
      { name: "Sapin-sapin", desc: "Layered sticky rice cake", price: 25, img: "img/shs/sapinsapin.jpg" },
      { name: "Maja Mais", desc: "Coconut corn pudding", price: 25, img: "img/shs/majamais.jpg" },
      { name: "Cassava Cake", desc: "Sweet cassava dessert", price: 35, img: "img/shs/cassavacake.jpg" }
    ]
  }
},

  pm: {
    name: "Potato Moto",
    desc: "Serving hot, crispy fries and tasty snacks that everyone loves—perfect for any time of day.",
    location: "Outside Old Gym",
    time: "5-8 min",
    rating: "4.5",
    image: "img/pm/pm.jpg",
    popout: `
      <img src="img/pm/pm.jpg">
      <p>Serving hot, crispy fries and tasty snacks that everyone loves—perfect for any time of day.</p>
      <p><strong>Location:</strong>Outside Old Gym</p>
      <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
    `,
    menu: {
    "Combo Meals": [
      { name: "PM1", desc: "Fries and drinks combo", price: 55, img: "img/pm/potatomoto.jpg" },
      { name: "PM2", desc: "Fries, cheese rolls, and drinks combo", price: 65, img: "img/pm/potatomoto.jpg" },
      { name: "PM3", desc: "Fries, mojos, and drinks combo", price: 65, img: "img/pm/potatomoto.jpg" },
      { name: "PM4", desc: "Fries, mojos, cheese rolls, and drinks combo", price: 69, img: "img/pm/potatomoto.jpg" },
      { name: "PM5", desc: "Fries, grill cut, and drinks combo", price: 65, img: "img/pm/potatomoto.jpg" },
      { name: "PM6", desc: "Fries, grill cut, cheese rolls, and drinks combo", price: 69, img: "img/pm/potatomoto.jpg" },
      { name: "PM7", desc: "Fries, wedges, and drinks combo", price: 65, img: "img/pm/potatomoto.jpg" },
      { name: "PM8", desc: "Fries, wedges, cheese rolls, and drinks combo", price: 69, img: "img/pm/potatomoto.jpg" },
      { name: "PM9", desc: "Cheese rolls and drinks combo", price: 45, img: "img/pm/potatomoto.jpg" }
    ]
  }
},

  jc: {
  name: "Kingprim Japanese Cake & More",
  desc: "Delicate Japanese cakes, waffles, fried snacks, and ice cream for every sweet craving.",
  location: "Outside Old Gym",
  time: "5-8 min",
  rating: "4.5",
  image: "img/jc/jc.jpg",
  popout: `
    <img src="img/jc/jc.jpg">
    <p>Delicate Japanese cakes, waffles, fried snacks, and ice cream for every sweet craving.</p>
    <p><strong>Location:</strong>Outside Old Gym</p>
    <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
  `,
  menu: {
    "Japanese Cakes": [
      { name: "Cheese & Chocolate Japanese Cake", desc: "Combination of cheese and chocolate flavors", price: 20, img: "img/jc/jpcake1.jpg" },
      { name: "Oreo-Blueberry Japanese Cake", desc: "Oreo and blueberry flavored cake", price: 25, img: "img/jc/jpcake2.jpg" },
      { name: "Yema-Strawberry Japanese Cake", desc: "Yema and strawberry flavored cake", price: 25, img: "img/jc/jpcake3.jpg" }
    ],
    "Pancakes & Waffles": [
      { name: "Lolly Waffle", desc: "Sweet Japanese-style waffle", price: 35, img: "img/jc/lollywaffles.jpg" },
      { name: "Lolly with Ice Cream", desc: "Waffle with ice cream topping", price: 50, img: "img/jc/lollywaffles.jpg" },
      { name: "Mini Pancakes", desc: "Bite-sized fluffy pancakes", price: 35, img: "img/jc/minipancakes.jpg" },
      { name: "Belgian Waffle", desc: "Classic Belgian-style waffle", price: 55, img: "img/jc/belgianwaffles.jpg" }
    ],
    "Fried Snacks": [
      { name: "Fried Oreos", desc: "Crispy fried Oreo cookies", price: 30, img: "img/jc/friedoreos.jpg" },
      { name: "Takoyaki", desc: "Japanese octopus balls", price: 65, img: "img/jc/takoyaki.jpg" },
      { name: "Corndog", desc: "Classic corn dog on a stick", price: 65, img: "img/jc/corndog.jpg" }
    ]
  }
},

  mt: {
    name: "I❤️Milktea",
    desc: "Refreshing milk tea drinks in a variety of flavors to satisfy every craving.",
    location: "Outside Old Gym",
    time: "5-8 min",
    rating: "4.5",
    image: "img/mt/mt.jpg",
    popout: `
      <img src="img/mt/mt.jpg">
      <p>Refreshing milk tea drinks in a variety of flavors to satisfy every craving.</p>
      <p><strong>Location:</strong>Outside Old Gym</p>
      <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
    `,
    menu: {
      Milktea: [
        { name: "Classic Milktea", desc: "Black tea with milk and pearls", price: 65, img: "img/mt/classicmilktea.jpg" },
        { name: "Wintermelon Milktea", desc: "Sweet wintermelon flavor", price: 70, img: "img/mt/wintermelonmilktea.jpg" },
        { name: "Okinawa Milktea", desc: "Brown sugar flavor", price: 75, img: "img/mt/okinawamilktea.jpg" },
        { name: "Matcha Milktea", desc: "Earthy green tea flavor", price: 75, img: "img/mt/matchamilktea.jpg" },
        { name: "Taro Milktea", desc: "Sweet taro root flavor", price: 75, img: "img/mt/taromilktea.jpg" },
        { name: "Chocolate Milktea", desc: "Rich cocoa flavor", price: 70, img: "img/mt/chocomilktea.jpg" },
        { name: "Strawberry Milktea", desc: "Fruity strawberry blend", price: 75, img: "img/mt/strawberrymilktea.jpg" }
      ]
    }
  }
};
