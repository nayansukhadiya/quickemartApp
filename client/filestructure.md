└── 📁client
    └── 📁public
        └── 📁data
            └── brands.json           # Renamed for clarity
            └── categories.json       # Renamed for clarity
            └── logo_search.json      # Renamed for clarity
            └── names.json            # Renamed for clarity
            └── test.json             # Renamed to lowercase for consistency
        └── _redirects
        └── applogo.png
        └── favicon.png
        └── index.html
        └── manifest.json
        └── robots.txt
    └── 📁src
        └── 📁assets
            └── 📁animations           # Renamed for broader use of animations
                └── boom.gif
                └── celebration.gif
            └── 📁brand_logos          # Renamed for clarity
                └── 24_mantra.png
                └── 4700bc.png
            └── 📁categories           # Renamed for better context
                └── cat_baking.png
            └── 📁category_images      # Clarified folder purpose
                └── asian_sauces.png
            └── 📁images               # Consolidated all general images
                └── delivery_boy.png
                └── gift.png
            └── 📁fonts
                └── 📁helvetica-255-webfont
                    └── example.html
                └── gilroy-regular.ttf  # Renamed for consistency
            └── 📁logos
                └── logo.png
                └── logo.gif           # Moved from gifLogo
        └── 📁components
            └── AddToCartButton.jsx    # Renamed for clarity
            └── AverageColorPicker.jsx
            └── BackBtnButton.jsx
            └── BottomNavBarigation.jsx
            └── ProductCardSlider.jsx
            └── CartButton.jsx
            └── CartPopUpup.jsx
            └── CircularLoader.jsx
            └── Footer.jsx
            └── Loader.jsx
            └── LogoDisplay.jsx
            └── Navbar.jsx
            └── ActionButton.jsx
            └── ProductNavigation.jsx
            └── SearchInput.jsx        # Renamed for better context
        └── 📁context
            └── UserContext.js
            └── UserContextProvider.js
        └── 📁hooks
            └── useFetchCategory.js    # Standardized naming
            └── useIcons.js
            └── useProductList.js
            └── useProductSearch.js
            └── useChatProduct.js
            └── useDebounce.js
            └── useFetchProducts.js
            └── useGeminiChat.js
        └── 📁pages
            └── 📁Account
                └── Account.css
                └── AccountPage.jsx    # Clarified file purpose
            └── 📁Cart
                └── CartPage.css       # Renamed to match page name
                └── CartPage.jsx
                └── CartCard.jsx
            └── 📁CartGeneratorPageerator        # Renamed for clarity
                └── CartGeneratorPageeratorPage.jsx
                └── CartGeneratorPageeratorCard.css
                └── CartGeneratorPageeratorCard.jsx
            └── 📁Category
                └── CategoryPage.jsx
                └── CategoryPage.css
                └── CategoryProductCard.jsx
                └── ProductCategory.jsx
            └── 📁Chat
                └── ChatButton.jsx
                └── ChatBackground.jsx
                └── ChatBot.jsx
                └── ChatBox.css
                └── ChatGen.css
                └── ChatHistory.css
                └── ChatHistory.jsx
                └── ChatLoader.css
                └── ChatLoader.jsx
                └── ChatPage.css
                └── ChatPage.jsx
                └── TextAnimation.jsx
            └── 📁Home
                └── Banner.jsx
                └── FilteredProductsPage.jsx
                └── HomePage.jsx       # Renamed for consistency
                └── HomeBanner.jsx
            └── 📁Login
                └── LoginPage.jsx
            └── 📁ProductDetail
                └── RelatedProducts.jsx
                └── ProductDetailPage.jsx
                └── RelatedBrands.jsx
            └── 📁Search
                └── SearchPage.jsx
            └── 📁Shop
                └── ShopPage.jsx       # Renamed for clarity
                └── ShopSidebarNav.jsx # Clarified file purpose
                └── SkeletonCard.jsx
                └── SkeletonSection.jsx
            └── 📁SignIn
                └── SignInPage.jsx     # Renamed for consistency
            └── commonStyles.css       # Consolidated general styles
            └── index.css
            └── layout.css
        └── 📁styles                   # Consolidated CSS folder
        └── App.test.js
        └── config.js
        └── index.js
        └── Layout.js
        └── reportWebVitals.js
        └── setupTests.js
    └── .env
    └── .gitignore
    └── netlify.toml
    └── package-lock.json
    └── package.json
