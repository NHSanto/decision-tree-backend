
# **Decision Tree Processing Backend**

This project implements a decision tree processing backend in **TypeScript**, allowing users to define and execute custom business logic via a decision tree structure.

## **Key Features**

- **Serialization & Deserialization**: 
  - Convert decision trees to/from JSON format.
  - Trees can be parsed into executable structures.
  
- **Supported Actions**:
  - **SendEmail**: Logs a message with sender/receiver details to simulate sending an email.
  - **SendSMS**: Logs a message with the phone number to simulate sending an SMS.
  - **Condition**: Evaluates JavaScript expressions and branches based on the result (e.g., `if-else` logic).
  - **Loop**: Repeats a subtree a specified number of times.

- **Extensibility**:
  - Register new actions easily via configuration.
  
- **Backend Execution**:
  - A backend service receives a JSON decision tree, deserializes it, and executes the actions as per the tree structure.

---

## **Prerequisites**

- **Node.js** (version 20.x or higher)
- **npm** or **yarn** (for package management)

---

## **Getting Started**

### 1. **Clone the Repository**

```bash
git clone https://github.com/NHSanto/decision-tree-backend.git
cd decision-tree-backend
```

### 2. **Install Dependencies**

Run the following command to install the required packages:

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory and add the following:

```bash
ACTIONS=SendEmail,SendSMS,Condition,Loop
```

### 4. **Run the Application**

To start the application in development mode:

```bash
npm run dev
```

### 5. **Run Tests**

The project uses **Jest** for testing. Run the tests with:

```bash
npx jest
```

---

## **Project Structure**

- **src/**: Contains the source code for the decision tree processing.
- **tests/**: Unit tests for the different components and actions.

---

## **How It Works**

1. The backend service accepts a **JSON decision tree**.
2. The tree is **deserialized** into an executable structure.
3. The service **executes the actions** (e.g., `SendEmail`, `Condition`, `Loop`) as per the tree's flow.

---

Feel free to explore and extend the project by adding new actions or enhancing existing ones! 🎉