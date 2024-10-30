# Bridle Path Damage Report

This mobile-first website is created for an artificial use case of reporting bridle path damage. For more specific instructions, you can click the link below. It was an assignment during my study in Sunderland Uni.

[View assignment brief here.](https://docs.google.com/document/d/10Gjn6gvvqFhjnYN8RRPFXX74GLPqK3pXCYrOBWeXhOY/edit)

[View live project here.](https://assessment2-psi.vercel.app/)

## UI/UX Design

The start of this project starts with designing the UI Flowchart. The flowchart will be used to create UI mockups created in Figma.

![UI Flowchart.png](/bridle-path-damage-reporting-app/UI_Flowchart.png)

The Figma mockups were made accordingly with a mobile-first view in mind. Find the complete Figma project [here.](https://www.figma.com/design/hFM2D7u2Uk93YRl9uaQSCt/Assessment-2?node-id=0%3A1&t=UgJ3CtUv8049WXlX-1)

![Untitled](/bridle-path-damage-reporting-app/Untitled.png)

In this Figma project, a design system is created and used. Using the same stylings for titles, headings, paragraphs, etc. A colour swatch is included in this design system.

![Untitled](/bridle-path-damage-reporting-app/Untitled%201.png)

## Development

This website is created using React.js, styled with TailwindCSS, Firebase for authentication, and Firestore for a NoSQL database.

### Navigation

The app consists of 2 main ‘faces’: the public-facing side where the general public can report the damaged paths and the admin-facing side where admins can track and update the progress of repairing the reported damages. All of the pages in the app are routed with ReactRouter, and Wrapped with a custom hook **FormContextProvider** for simple state management.

```jsx
<BrowserRouter>
	<FormContextProvider>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/q1" element={<Question1 />} />
			<Route path="/q2" element={<Question2 />} />
			<Route path="/q3" element={<Question3 />} />
			<Route path="/error" element={<ErrorScreen />} />
			<Route path="/home" element={<CouncilHome />} />
			<Route path="/in-progress" element={<InProgress />} />
			<Route path="/archive" element={<Archive />} />
		</Routes>
	</FormContextProvider>
</BrowserRouter>
```

When loading admin pages, a check is carried out to make sure only logged in people (admins) are able to open the pages. If no user is logged in, the webpage will reroute to the home page.

```jsx
const user = auth.currentUser;
const nav = useNavigate();

//simple check. if user is not signed in (a public member), redirect to nav
useEffect(() => {
	if (user === null) {
		nav("/");
	}
}, [auth]);
```

There are 2 question pages for the client to fill in a report, Question1.js and Question2.js. In these pages, validations are there to ensure the required fields are filled before moving on to the next step of the reporting process.

```jsx
function handleNextPage() {
	//check if radio buttons is not ticked
	if (formContext.formState.type === "") {
		// show overlay
		toggleOverlay();
	} else {
		//go to next page if yes
		nav("/q2");
	}
}
```

### Authentication

The authentication is done using Firebase. More specifically, using a Google Sign-in. In retrospect, it would make more sense to use a regular email sign-in as not everyone, hence not all admins use Gmail as their email.

```jsx
export async function signInWithGoogle(auth, provider) {
	await signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			console.log(user);
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}
```

It is deliberate that there are no sign up functionality in the app, as it would defeat the purpose of separating admin and public face of the app. Signing up other admins would need direct access to the Firebase console, or implementing multi-tier admin roles, which is beyond the scope of the assignment.
