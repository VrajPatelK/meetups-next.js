import React from "react";
import MeetUpDetails from "../../components/meetups/MeetUpDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetUpPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetUpDetails
        id={props.meetup.id}
        title={props.meetup.title}
        address={props.meetup.address}
        image={props.meetup.image}
        description={props.meetup.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  // DB
  const client = await MongoClient.connect(
    "mongodb+srv://vrajpatel4801:Do3BAnxmTzMI9DCD@meetup-cluster.abqjqi5.mongodb.net/meetups"
  );
  const db = client.db();

  // COLLECTION
  const meetupsCollection = db.collection("meetups");

  // GET
  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray(); // only select ids

  // CLOSE
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetId: meetup._id.toString(),
      },
    })),

    // [
    //   {
    //     params: { meetId: "1" },
    //   },
    //   {
    //     params: { meetId: "2" },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  //
  const { meetId } = context.params;

  // DB
  const client = await MongoClient.connect(
    "mongodb+srv://vrajpatel4801:Do3BAnxmTzMI9DCD@meetup-cluster.abqjqi5.mongodb.net/meetups"
  );
  const db = client.db();

  // COLLECTION
  const meetupsCollection = db.collection("meetups");

  // GET
  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetId) });

  // CLOSE
  client.close();

  //
  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
      },
    },
  };
}

export default MeetUpPage;
