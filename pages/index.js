import React from "react";
import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// id. title. description. image. address

// const DUMMY_MEETUPS = [
//   {
//     id: 1,
//     title: "meet-1",
//     description: "thid is description of meet-1",
//     image:
//       "https://railrocker.com/playground/wp-content/uploads/2016/11/big-ben-london-united-kingdom-europe-.jpg",
//     address: "address of meet-1",
//   },
//   {
//     id: 2,
//     title: "meet-2",
//     description: "thid is description of meet-2",
//     image:
//       "https://images.unsplash.com/photo-1567763080858-9ec9f4e0847a?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     address: "address of meet-2",
//   },
// ];

//
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Next.js Meetups</title>
        <meta
          name="description"
          content="Browse a huge of highly active React meetups!"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  //DB
  const client = await MongoClient.connect(
    "mongodb+srv://vrajpatel4801:Do3BAnxmTzMI9DCD@meetup-cluster.abqjqi5.mongodb.net/meetups"
  );
  const db = client.db();

  // COLLECTION
  const meetupsCollection = db.collection("meetups");

  // GET
  const meetups = await meetupsCollection.find().toArray();

  // CLOSE
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(), // #IMP
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
