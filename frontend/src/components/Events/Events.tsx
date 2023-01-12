import type { NextPage } from 'next';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './Events.module.scss';
import { DiVim } from 'react-icons/all';
import Spinner from '../utils/components/Spinner/Spinner';
import Event from '../Event/Event';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

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
    <div className={styles.events}>
      <h2 className={styles.title}>Upcoming Events</h2>

      <section>
        <div className={styles.eventContainer}>
          {eventsData.slice(0, 3).map(event => (
            <div key={event._id}>
              <Event {...event} />
            </div>
          ))}
        </div>
        <Link href="/calendar" className={styles.link}>
          Show more <FaAngleRight />
        </Link>
      </section>
    </div>
  );
};

export default Events;
