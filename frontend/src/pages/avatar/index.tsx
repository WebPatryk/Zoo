import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import styles from './Login.module.scss';

interface Avatar {
  id: string;
  img: string;
}

const Index: NextPage = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | unknown>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchAvatars = async () => {
      const response = await fetch('avatars');

      const responseData = await response.json();
      setAvatars(responseData);
      console.log(responseData);
    };

    fetchAvatars();
  }, []);

  const handleSubmit = async () => {
    if (selectedAvatar) {
      setIsButtonDisabled(false);

      const setAvatar = async () => {
        const response = await fetch('setAvatar');

        const responseData = await response.json();
        // setAvatar(responseData);
        console.log(responseData);
      };
      setAvatar();

      await router.push('/');
    }
  };

  return (
    <div>
      <h3>Pick your profile picture</h3>
      <form onSubmit={handleSubmit}>
        {avatars.map((avatar: Avatar) => (
          <img
            src={avatar.img}
            alt=""
            onClick={() => setSelectedAvatar(avatar.id)}
          />
        ))}
        <button type="submit" disabled={isButtonDisabled}>
          Save as profile picture
        </button>
      </form>
    </div>
  );
};

export default Index;
