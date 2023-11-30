import React from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetUpPage = () => {
  //
  const router = useRouter();

  //
  const addMeetUpHandler = (newMeetUp) => {
    // API
    fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetUp),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("something went wring!");
        return response.json();
      })
      .then((data) => {
        // router.replace("/");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add new own meetups and create amazing networking opportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </>
  );
};

export default NewMeetUpPage;
