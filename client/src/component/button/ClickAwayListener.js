import { useEffect } from 'react';

export default function ClickAwayListener(props) {
  const { children, onClickAway } = props;

  useEffect(() => {
    function handleClick(event) {
      // Check if the clicked element is inside the component
      if (!event.target.closest('.click-away-listener')) {
        // If it's not, call the onClickAway function
        onClickAway();
      }
    }

    // Attach the event listener
    document.addEventListener('mousedown', handleClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClickAway]);

  return (
    <div className="click-away-listener">
      {children}
    </div>
  );
}
