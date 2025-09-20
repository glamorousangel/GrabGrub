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
      Burgers: [
        { name: "Classic Burger", desc: "Beef patty, lettuce, tomato, onion, cheese", price: 85, img: "img/classic-burger.png" },
        { name: "Cheese Overload", desc: "Double cheese, beef patty, secret sauce", price: 99, img: "img/cheese-burger.png" }
      ],
      Drinks: [
        { name: "Iced Tea", desc: "Refreshing brewed iced tea", price: 25, img: "img/iced-tea.png" }
      ]
    }
  },

  d: {
    name: "Daisee's",
    desc: "Freshly baked breads and pastries made with care for every occasion.",
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
      Pizzas: [
        { name: "Pepperoni Pizza", desc: "Classic pepperoni with cheese", price: 120, img: "img/pepperoni.png" },
        { name: "Hawaiian Pizza", desc: "Pineapple, ham, cheese", price: 130, img: "img/hawaiian.png" }
      ],
      Drinks: [
        { name: "Soda", desc: "Choice of Coke, Sprite, Royal", price: 30, img: "img/soda.png" }
      ]
    }
  },

  pc: {
    name: "Potato Corner",
    desc: "Crispy, golden fries and flavorful snacks loved by all ages.",
    location: "Outside Old Gym",
    time: "8-12 min",
    rating: "4.7",
    image: "img/pc/pc.jpg",
    popout: `
      <img src="img/pc/pc.jpg">
      <p>Crispy, golden fries and flavorful snacks loved by all ages.</p>
      <p><strong>Location:</strong>Outside Old Gym</p>
      <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
    `,
    menu: {
      Noodles: [
        { name: "Chicken Ramen", desc: "Rich broth, egg, chicken, noodles", price: 110, img: "img/chicken-ramen.png" },
        { name: "Beef Stir Fry", desc: "Wok-fried beef with veggies", price: 115, img: "img/beef-stirfry.png" }
      ],
      Drinks: [
        { name: "Green Tea", desc: "Japanese-style hot green tea", price: 35, img: "img/green-tea.png" }
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
      <p>Serving hot, crispy fries and tasty snacks that everyone loves—perfect for any time of day.Fresh-baked bread, premium fillings, and tasty sauces.</p>
      <p><strong>Location:</strong>SHS Building</p>
      <p><strong>Hours:</strong> Mon-Thru: 8AM-5PM</p>
    `,
    menu: {
      Sandwiches: [
        { name: "Club Sandwich", desc: "Turkey, bacon, lettuce, tomato", price: 75, img: "img/club-sandwich.png" },
        { name: "Veggie Wrap", desc: "Seasonal veggies with hummus", price: 65, img: "img/veggie-wrap.png" }
      ],
      Drinks: [
        { name: "Bottled Water", desc: "500ml mineral water", price: 20, img: "img/water.png" }
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
      Sandwiches: [
        { name: "Club Sandwich", desc: "Turkey, bacon, lettuce, tomato", price: 75, img: "img/club-sandwich.png" },
        { name: "Veggie Wrap", desc: "Seasonal veggies with hummus", price: 65, img: "img/veggie-wrap.png" }
      ],
      Drinks: [
        { name: "Bottled Water", desc: "500ml mineral water", price: 20, img: "img/water.png" }
      ]
    }
  },

  jc: {
    name: "Kingprim Japanese Cake",
    desc: "Delicate, sweet, and beautifully crafted cakes inspired by Japanese flavors.",
    location: "Outside Old Gym",
    time: "5-8 min",
    rating: "4.5",
    image: "img/jc/jc.jpg",
    popout: `
      <img src="img/jc/jc.jpg">
      <p>Delicate, sweet, and beautifully crafted cakes inspired by Japanese flavors.</p>
      <p><strong>Location:</strong>Outside Old Gym</p>
      <p><strong>Hours:</strong> Mon-Fri: 8AM-5PM</p>
    `,
    menu: {
      Sandwiches: [
        { name: "Club Sandwich", desc: "Turkey, bacon, lettuce, tomato", price: 75, img: "img/club-sandwich.png" },
        { name: "Veggie Wrap", desc: "Seasonal veggies with hummus", price: 65, img: "img/veggie-wrap.png" }
      ],
      Drinks: [
        { name: "Bottled Water", desc: "500ml mineral water", price: 20, img: "img/water.png" }
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
      Sandwiches: [
        { name: "Club Sandwich", desc: "Turkey, bacon, lettuce, tomato", price: 75, img: "img/club-sandwich.png" },
        { name: "Veggie Wrap", desc: "Seasonal veggies with hummus", price: 65, img: "img/veggie-wrap.png" }
      ],
      Drinks: [
        { name: "Bottled Water", desc: "500ml mineral water", price: 20, img: "img/water.png" }
      ]
    }
  }
};

