import type { NextPage } from 'next';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './Events.module.scss';
import { DiVim } from 'react-icons/all';
import Spinner from '../utils/Spinner/Spinner';
import Event from '../Event/Event';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const Events = ({ eventsData }: { eventsData: EventInterface[] }) => {
  const [events, setEvents] = useState<EventInterface[]>([]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //
  //   const { signal } = abortController;
  //
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/events', {
  //         signal
  //       });
  //       const data = await response.json();
  //
  //       setEvents(data);
  //       console.log(data);
  //     } catch (error) {
  //       if (!signal?.aborted) {
  //         console.error(error);
  //       }
  //     }
  //   };
  //   fetchEvents();
  //
  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);

  return (
    <div>
      <h2 className={styles.title}>Upcoming Events</h2>

      <section className={styles.eventContainer}>
        {eventsData.slice(0, 3).map(event => (
          <div key={event._id}>
            <Event {...event} />
          </div>
        ))}
          <button className={styles.readMore}>Read more...</button>
      </section>
    </div>
  );
};

export default Events;
