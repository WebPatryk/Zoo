import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Events.module.scss';
import { DiVim } from 'react-icons/all';
import Spinner from '../utils/Spinner/Spinner';
import Event from '../Event/Event';

interface Event {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const defaultEvents = [
  {
    id: 0,
    thumbnail: '😁',
    title: "Dog's party at park",
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...'
  },
  {
    id: 1,
    thumbnail: '😎',
    title: 'Azor’s Partyk',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...'
  },
  {
    id: 2,
    thumbnail: '🥳',
    title: 'Save money',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...'
  }
];

const Events: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const { signal } = abortController;

    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events', {
          signal
        });
        const data = await response.json();

        setEvents(data);
        console.log(data);
      } catch (error) {
        if (!signal?.aborted) {
          console.error(error);
        }
      }
    };
    fetchEvents();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h2 className={styles.title}>Upcoming Events</h2>

      <section className={styles.eventContainer}>
        {events.length ? (
          events.slice(0, 3).map(event => (
            <div key={event._id}>
              <Event {...event} />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </section>
    </div>
  );
};

export default Events;
