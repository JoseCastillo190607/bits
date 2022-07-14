import ReactDOM from "react-dom";
import BitsApp from "./BitsApp";
import "./styles/Index.css";
import "./styles/swal.css";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:5000/graphql",
    // uri: "http://52.15.66.109:5000/graphql",
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BitsApp />
  </ApolloProvider>,
  document.getElementById("root")
);
