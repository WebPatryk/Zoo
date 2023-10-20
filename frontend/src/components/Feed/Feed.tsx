import type { NextPage } from 'next';
import styles from './Feed.module.scss';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import CustomProgressBar from '../utils/components/ProgressBar/CustomProgressBar';

const Feed: NextPage = () => {
  const defaultData = [
    {
      id: 0,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: "Dog's party at park",
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '25%'
      }
    },
    {
      id: 1,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: "Azors's party at somewhere",
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '90%'
      }
    },
    {
      id: 2,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: 'Save money',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '55%'
      }
    }
  ];

  const { t } = useTranslation('common');
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Visited zoo</h3>

      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true
        }}
        grabCursor={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
        navigation={true}
        keyboard={true}
        style={{ margin: 0 }}
        autoplay={true}
      >
        {defaultData.map(data => (
          <SwiperSlide
            key={data.id}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <img
              src={data.thumbnail}
              height={100}
              width={100}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <CustomProgressBar progress={data.progress} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feed;
