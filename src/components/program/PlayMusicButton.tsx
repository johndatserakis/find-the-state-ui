import { useState } from 'react';
import useSound from 'use-sound';
import { VolumeOffRounded, VolumeUpRounded } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import nationalAnthem from '../../sounds/united-states-national-anthem.mp3';
import marchFurDieArche from '../../sounds/bachs-march-fur-die-arche.mp3';
import thePresidentsMarch from '../../sounds/the-presidents-march.mp3';
import { sample as _sample } from 'lodash';

const sounds = [nationalAnthem, marchFurDieArche, thePresidentsMarch];

export const PlayMusicButton = () => {
  const [sound, setSound] = useState(_sample(sounds));
  // Undocumented loop feature https://github.com/joshwcomeau/use-sound/issues/26#issuecomment-643389102
  // @ts-ignore
  const [play, { isPlaying, stop }] = useSound(sound, { interrupt: false, loop: true });
  const Icon = isPlaying ? VolumeUpRounded : VolumeOffRounded;

  const onClick = () => {
    if (isPlaying) {
      stop();
      setSound(_sample(sounds));
    } else {
      play();
    }
  };

  return (
    <Button onClick={onClick} title="Play Music">
      <Icon />
    </Button>
  );
};
