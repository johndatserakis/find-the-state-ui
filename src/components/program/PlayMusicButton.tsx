import { useState } from 'react';
import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { sample as _sample } from 'lodash';
import useSound from 'use-sound';
import marchFurDieArche from '../../../public/sounds/bachs-march-fur-die-arche.mp3';
import thePresidentsMarch from '../../../public/sounds/the-presidents-march.mp3';
import nationalAnthem from '../../../public/sounds/united-states-national-anthem.mp3';

const sounds = [nationalAnthem, marchFurDieArche, thePresidentsMarch];

export const PlayMusicButton = () => {
  const [sound, setSound] = useState(_sample(sounds));
  // Undocumented loop feature https://github.com/joshwcomeau/use-sound/issues/26#issuecomment-643389102
  // @ts-ignore
  const [play, { isPlaying, stop }] = useSound(sound, {
    interrupt: false,
    loop: true,
  });
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
    <Tooltip title="Play Music" arrow>
      <Button onClick={onClick}>
        <Icon />
      </Button>
    </Tooltip>
  );
};
