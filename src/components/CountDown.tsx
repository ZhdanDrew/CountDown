import React, { useState, useEffect } from 'react';
import styles from './CountDown.module.css';

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const targetDate = new Date('2026-01-01T00:00:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft: TimeLeft = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (difference > 0) {
    timeLeft = {
      years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
      months: Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  return timeLeft;
};

const CountDown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.countDownCover}>
      <div className={styles.title}>Countdown to 2026</div>
      <div className={styles.numbersCover}>
        <div className={`${styles.spanCover} ${styles.years}`}>
          <span>{timeLeft.years}</span>
          <span className={styles.timeTxt}>YEARS</span>
        </div>
        <div className={`${styles.spanCover} ${styles.months}`}>
          <span>{timeLeft.months}</span>
          <span className={styles.timeTxt}>MONTHS</span>
        </div>
        <div className={`${styles.spanCover} ${styles.days}`}>
          <span>{timeLeft.days}</span>
          <span className={styles.timeTxt}>DAYS</span>
        </div>
        <div className={`${styles.spanCover} ${styles.hours}`}>
          <span>{timeLeft.hours}</span>
          <span className={styles.timeTxt}>HOURS</span>
        </div>
        <div className={`${styles.spanCover} ${styles.mins}`}>
          <span>{timeLeft.minutes}</span>
          <span className={styles.timeTxt}>MINUTES</span>
        </div>
        <div className={`${styles.spanCover} ${styles.secs}`}>
          <span>{timeLeft.seconds}</span>
          <span className={styles.timeTxt}>SECONDS</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
