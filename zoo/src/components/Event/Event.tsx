import { FC, useState } from 'react';
import styles from './Event.module.scss';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const Event: FC<EventInterface> = ({ ...event }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={styles.eventBox}>
      <img
        src={event.image}
        height={100}
        width={100}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        alt="icon"
      />
      <div className={styles.info}>
        <h4>{event.title}</h4>
        {isReadMore ? event.description.slice(0, 150) : event.description}
        <span onClick={toggleReadMore} className="read-or-hide">
          <span className={styles.readMore}>
            {isReadMore ? 'Read more...' : 'Show Less...'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Event;
