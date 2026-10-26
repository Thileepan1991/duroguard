// Web Audio API procedural sound synthesizer for Ferrolux
// Generates realistic architectural sounds (magnetic deadbolt latch, hydraulic door movement, tactile metal clicks)
// Completely zero-dependency and 100% reliable across browsers without external audio files.

class SoundFXEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check if muted previously
    const saved = localStorage.getItem('ferrolux_sound_muted');
    this.isMuted = saved === 'true';
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('ferrolux_sound_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playTactileClick();
    }
    return this.isMuted;
  }

  // Soft tactile brushed steel UI click
  public playTactileClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Heavy mechanical magnetic lock / motorized deadbolt clunk
  public playLockSound(locked: boolean) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Motorized low hum
      const oscMotor = this.ctx.createOscillator();
      const gainMotor = this.ctx.createGain();
      oscMotor.type = 'sine';
      oscMotor.frequency.setValueAtTime(locked ? 180 : 120, now);
      oscMotor.frequency.linearRampToValueAtTime(locked ? 240 : 90, now + 0.18);
      gainMotor.gain.setValueAtTime(0.12, now);
      gainMotor.gain.linearRampToValueAtTime(0.001, now + 0.18);
      oscMotor.connect(gainMotor);
      gainMotor.connect(this.ctx.destination);
      oscMotor.start(now);
      oscMotor.stop(now + 0.18);

      // 2. Heavy steel bolt impact
      const oscThud = this.ctx.createOscillator();
      const gainThud = this.ctx.createGain();
      oscThud.type = 'triangle';
      oscThud.frequency.setValueAtTime(85, now + 0.06);
      oscThud.frequency.exponentialRampToValueAtTime(35, now + 0.22);
      gainThud.gain.setValueAtTime(0.2, now + 0.06);
      gainThud.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      oscThud.connect(gainThud);
      gainThud.connect(this.ctx.destination);
      oscThud.start(now + 0.06);
      oscThud.stop(now + 0.22);

      // 3. Metallic ring resonance
      const oscRing = this.ctx.createOscillator();
      const gainRing = this.ctx.createGain();
      oscRing.type = 'sine';
      oscRing.frequency.setValueAtTime(locked ? 2200 : 1800, now + 0.07);
      gainRing.gain.setValueAtTime(0.06, now + 0.07);
      gainRing.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      oscRing.connect(gainRing);
      gainRing.connect(this.ctx.destination);
      oscRing.start(now + 0.07);
      oscRing.stop(now + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Smooth hydraulic door swing resonance
  public playDoorSwing() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.6);
      osc.frequency.linearRampToValueAtTime(75, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Spec sheet or sample kit confirmation chime
  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const time = this.ctx!.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + 0.6);
      });
    } catch {
      // Audio autoplay fallback
    }
  }
}

export const soundFX = new SoundFXEngine();
