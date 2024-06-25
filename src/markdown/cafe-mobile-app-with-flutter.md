# Flutter Cafe Mobile App

This project is the focus of my final year project at the University of Sunderland. I work as a barista, thus the combining of my passions of coffee and technology is exciting!

## Process

The developmental process started with making a faux company with brand identity as a client. This includes their vision and mission, developing their colour scheme, which influenced the UI design of the app.

Afterwards, an analysis was done to ensure the app specification is tailored to the company’s needs. This includes competitor and requirements analysis.

Design and Development would be the final stages of the process. Wireframing with Figma and developing the cross-platform app with Flutter.

## Cameo Coffee

![Logo.png](/cafe-mobile-app-with-flutter/Logo.png)

Cameo Coffee is an artisan cafe that currently only has one location. The cafe is based in the UK and is looking to further improve their service to customers by making a custom mobile app.

The logo of the café is a single line in the shape of a coffee bean. This symbolises the continuous demand of superior coffee that is supplied by Cameo Coffee. The gradient applied to the logo is a parallel to the mission of providing great coffee to everyone from any age, any background, with no discrimination – no segmented lines in the logo and no distinct colour separation.

The font face chosen for the logo is a serif font, “DM Serif Display”, which evokes a feeling of professionalism and seriousness, the approach taken from Cameo Coffee to their products. Serif fonts also suggests the weight of experience and history. In combination with the minimalistic logo, this showcases that Cameo Coffee is a modern café that aims to provide the best quality coffee, building on top of the experience of other cafés in the history of coffee. The font colours are brown and gold, relating to their products of coffee and excellence. The distinct colourations of the two words, Cameo and Coffee, is for the purpose of legibility.

In order to reflect the brand, the app colour scheme will revolve around the brown and gold colouration.

## Competitor Analysis

For competitor analysis, I analysed 3 apps: Starbucks and Costa apps for comparing with the industry leaders, and Trading Post Coffee for an independent cafe. Comparing these 2 categories of cafe apps allowed me to understand the competition and implement features that allows Cameo Coffee to standout.

In summary, it was essential for the app to not include any WebView for a better user experience, as using Trading Post Coffee app was slow and infuriating. The app should also not be bloated like Costa, but instead focusing on fewer features executed well. It should have better layout consistency than both Starbucks and Trading Post app, with legible text and clear visual hierarchy. The app will have consistent colour scheme, appropriate with the branding of the cafe.

A more comprehensive analysis can be found in my dissertation [here](https://docs.google.com/document/d/1_FDWUVmXwvg6N5B_JpdwfnwweNkxB9Hr/edit?usp=sharing&ouid=114976658092402289663&rtpof=true&sd=true).

## Requirements Analysis

In order for the project to be successful, clear goals and constraints are needed to be set. This allows the project to be more focused, more efficient, and completed in less time. Less time equals less money spent for the business!

Requirements can be categorised two different ways: functional and non-functional requirements. Functional requirements relate to what the app will achieve; what functionalities are present. This includes user registration and login, seeing the cafe menu in the app, online order system, and a loyalty programme.

Non-functional requirements relate to how the app is run and perceived. For this project, a cross-platform app is required for a better outreach to the client base. Most people use iOS based phones, but plenty use Android based phones. The app would also need to load in under 3 seconds to give a pleasant user experience. An intuitive UI is a must, along with accessibility with colour blindness, and smooth experience which means constant running at 60fps.

## Design

With the branding done, a wireframe can be made in Figma.

![Untitled](/cafe-mobile-app-with-flutter/Untitled.png)

The above mockups are for the main pages of the app. The splash screen, login/sign up page, and the main functionalities of the app. The menu, the rewards, the cart, the item customisation, and account page.

Icons for menu items were also created.

![Untitled](/cafe-mobile-app-with-flutter/Untitled%201.png)

These will be made in the app for each differing menu item.

The navigation is simple, with at most 2 layers of navigation. Most of the navigation is done using a bottom navigation bar, and a modal will pop up in some interactions. For example, clicking on a menu item to customise the item. The less nested a navigation is, the less confusing it is.

Firestore is used as a NoSQL storage solution as it is faster to write to the database than the average SQL storage solution. Due to the potential volume of read/writes in the form of clients ordering and reading the menu, it is also more cost effective than in a relational database. Furthermore, the use of Firebase Console allows better DX as both Firestore and Firebase Auth are accessible from the same Firebase Console.

## Development

This project was made in Flutter mostly due to the more robust tooling and documentation compared to React Native, leading to a better DX. Having a full IDE (Android Studio) also helps in improving DX.

The project is created using the MVC (Model-View-Controller) architecture. In hindsight, it might be better to use a more Flutter-centric model (if that’s a term?) such as the Provider pattern or BLoC. However the limited time did not allow me to study these architecture patterns from the beginning.

Important models include cart_model.dart, user_model.dart, order_item_menu.dart, etc. Repeating UI elements are refactored into components, such as botnavbar.dart and buttons.dart. This will make the UI screen (e.g. home_screen.dart) code more readable.

Complete code can be seen here.

[https://github.com/shawnanuptra/CameoCoffee](https://github.com/shawnanuptra/CameoCoffee)

## Conclusion and Evaluation

![Untitled](/cafe-mobile-app-with-flutter/Untitled%202.png)

In conclusion, I don’t think I did my best in my dissertation. Time management was not great, hence not enough time to polish the app and implement all of the desired functionalities. Was it too ambitious of a project for a 5 months plan? Perhaps - I personally don’t think so. If I am able to redo this project, with this experience I have now, I could definitely make the deadline.

Other than time management, I would also use the Provider pattern to make the codebase more readable and organised. Further additions to the app include payment functionality, and analytics (how many orders in a day, most popular items, etc.).

Suffice to say, this was definitely a huge learning opportunity for me in knowing my preferred working methods and holding myself accountable. A small plus, it is enough to grant me First Honours in the University of Sunderland!
