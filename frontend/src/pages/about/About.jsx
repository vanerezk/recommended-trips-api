import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <h1 className="title text-center text-primary mb-5">About</h1>

      <p className="text-center w-50 mx-auto parrafo">
        Welcome to TravelLog, the blog where you can recommend experiences from
        your trips and also find the most charming destinations in the world!
      </p>

      <p className="text-center w-50 mx-auto parrafo">
        Embark on a journey of discovery with our community as they travel the
        world, revealing hidden gems and sharing your first-hand experiences
        through captivating photography and insightful reviews.{" "}
      </p>

      <p className="text-center w-50 mx-auto parrafo">
        Whether you are enjoying the serenity of a secluded beach, the hustle
        and bustle of a vibrant city, or the stunning views of majestic
        mountains, our hand-picked recommendations promise to ignite your
        wanderlust and inspire others to your next adventure.
      </p>

      <p className="text-center w-50 mx-auto parrafo">
        Let us take you on a virtual journey, where you will immerse yourself in
        the beauty of multiple cultures and landscapes without even leaving your
        seat.{" "}
      </p>

      <p className="text-center w-50 mx-auto parrafo">
        Join us as we delve into the heart of your travels, one destination at a
        time, and let the magic of exploration fuel your dreams.
      </p>

      <Link to="/recommendations">
        <button className="btn btn-primary d-block mx-auto mt-5">
          Check out our recommendations!
        </button>
      </Link>
    </>
  );
}

export default About;
