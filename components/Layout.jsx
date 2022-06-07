// import Head from "next/head";
// import { useRouter } from "next/router";
// // import styles from "@/styles/Layout.module.css";
// // import Header from "./Header";
// // import Footer from "./Footer";
// import ShowCase from "./Showcase";

// export default function Layout({ title, keywords, description, children }) {
//   const router = useRouter();

//   return (
//     <div>
//       <Head>
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <meta name="keywords" content={keywords} />
//       </Head>

//       {router.pathname === "/" && <ShowCase />}
//       <div className={styles.container}>{children}</div>
//     </div>
//   );
// }

// Layout.defaultProps = {
//   title: "Kitchen Bar",
// };
