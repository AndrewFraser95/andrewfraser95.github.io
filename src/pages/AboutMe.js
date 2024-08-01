import React from "react";
import { SpaceContainer } from "../components/StyledComponents";
import AnimatedComponents from "../components/AnimatedComponents";
import { useNavigate } from "react-router-dom";
import "../styles/AboutMe.css";

const AboutMe = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };

  return (
    <SpaceContainer>
      <div className="content-container">
        <h1>About Me</h1>
        <h2>Who is Andrew Fraser?</h2>
        <h3>Good Question!</h3>
        <p>
          I am a 27-year-old programmer with nearly 20 years’ worth of
          experience being a massive nerd. I currently work at AND Digital as a
          Senior Product Developer working for a variety of clients. Delivering
          high-quality frontend applications and websites, helping clients
          improve their Agile artefacts and trying to upskill all members of the
          teams. Before that I worked for High Speed Training in their Learner
          Engagement team; focusing on collecting user engagement using Azure
          Application Insights, creating templates for our in-house content
          authors to use in our Angular Single Page Web App, expanding our
          RESTful API functionality and maintaining excellent Lighthouse scores
          for all of our pages.
        </p>

        <h3>What do you do…generally?</h3>
        <p>
          In my spare time, I enjoy automating various things around my house,
          reading books outside and getting a bit too competitive at pub
          quizzes. I live with my partner Charley and we’ve yet to have any
          pets. But when we do buy a house we want to buy some chickens that we
          have already named Jelly, Jammy and Gemma.
        </p>

        <h3>What do you do…here?</h3>
        <p>
          This blog is home to a lot of blog posts. Those that cover various
          tech trivia and gadgets, namely smart home devices. As well as
          discussing various professional ideas of which opinions are solely my
          own. At work I specialise in creating extremely high-quality, TDD,
          projects that are extensible, accessible and versatile and outside of
          work I specialise in Pub Quizzes, running 5k’s and finding bargains
          online. In the past, I have focussed on areas of, as the government is
          now calling it “Cyber”, such as Digital Footprints, Neural Networks
          and even straying into iOS app development for the National Railway
          Museum.
        </p>

        <h3>Projects</h3>
        <p>
          I’ve worked with a variety of clients at AND Digital, some of whom I
          can’t disclose on this blog. But I can say that I’ve worked on
          Extremely large-scale websites for very well-known companies.
          Delivering very performant work, in a timely manner to the highest of
          standards. Quickly moving up the ranks within the company receiving
          some very lovely feedback as to my efforts.
        </p>

        <h3>Digital Footprints</h3>
        <p>
          In 2016 I did a short 15-minute presentation on Digital Footprints and
          what they really mean when you get rid of all the technology
          mumbo-jumbo. I demonstrated I could acquire extensive personal
          information about a subject. Their family members, finances, political
          views and had a great footing to start Social Engineering this person.
          Ending the presentation with tips on how to secure yourself online and
          a Q+A that delved into the more complex nature of securing friends and
          family online.
        </p>

        <h3>Neural Networks</h3>
        <p>
          My Dissertation at University was titled, “Sentiment Analysis on
          Shakespeare Sonnets written using Andrej Karpathy’s Recurrent Neural
          Network.” It focussed on rehashing a Neural Network and feeding it all
          of Shakespeare’s Sonnets, getting the results from the Neural Network
          after various iterations. The results from this were then put through
          spellcheck and then handed to a group of testers and asked to be rated
          on both content and emotional impact. The conclusion? The original
          hypothesis stated that if a Recurrent Neural Network could replicate
          something that could be mistaken for an Elizabethan Sonnet,
          specifically a work by Shakespeare, then the project would be a
          success; with ‘replication’ defined by promising results after
          sentiment analysis. The original target, as illustrated in Chapter 4,
          Section 3, was to create a recurrent neural network with around 89.6%
          accuracy, similar to that of Shakespeare, (Words he used, versus words
          he created). In the Sonnet seen in Chapter 5, Section 1, Part 6, which
          was reached in about 30 minutes, 83 out of the 100 words produced were
          valid or pseudo-valid (following English grammar rules). This figure
          is only 6.6% behind the yardstick set out at the outset for
          Shakespeare’s accuracy: perhaps the greatest writer in history, with a
          lifetime of linguistic experience and human emotion to draw upon. So
          while the RNN-written sonnet hardly qualifies as great literature, it
          could be argued that as the Recurrent Neural Network started with no
          knowledge of the English Language – and had, presumably, never had its
          heart broken – to create the sonnet that it generated after just 30
          minutes is a highly promising result.
        </p>

        <h3>iOS Development?</h3>
        <p>
          Yes. iOS Development. I spent a term in my final year at University,
          between classes, working with the lovely folk at the National Railway
          Museum (NRM), in making one of their extremely interesting data
          collections, accessible to a wider audience. The app titled, “Fallen
          Railwaymen”, was an iOS application, that was responsive on all iOS
          devices, that made available a database of 11,000 strong World War
          soldiers that had also worked for the railway, but fallen in battle,
          and some location, trivia and rank of the officer. Splitting the app
          up to using an Apple Maps API, to pin the locations of the soldiers
          and their homes, on a map to investigate. A quiz on other War facts
          related to both the data and the railway in general. As well as an
          efficient search functionality to allow people to search soldiers by
          location, surname, rank or battalion.
        </p>
      </div>

      <button className="previous-button" onClick={handleClick}>
        Go to Home
      </button>
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default AboutMe;
