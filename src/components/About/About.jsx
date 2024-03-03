import './About.scss';
import bytes from "bytes";

export const About = ({ about }) => {
  const total = bytes(about.total);
  const used = bytes(about.used);
  const usedInPercent = ((100 * about.used) / about.total).toFixed(2);
  const trashed = bytes(about.trashed);
  const trshedInPercent = ((100 * about.trashed) / about.total).toFixed(2);
  const free = bytes(about.free);
  const totalUsed = +usedInPercent + +trshedInPercent;

  console.log('total', total);
  console.log('used', used);
  console.log('trashed', trashed);
  console.log('free', free);
  console.log(usedInPercent, '%');
  return (
    <div className="progress-bar">
      <div className="progress-bar__label">Total size: {total}%</div>
      <div className="progress-bar__label">Used: {used}</div>
      <div className="progress-bar__label">Free: {free}</div>
      <div className="progress-bar__label">Trashed: {trashed}</div>

      <div className="progress-bar__wrapper">
        <div 
          className="progress-bar__fill"
          style={{width: `${usedInPercent}%`}}
        >
        </div>
        <div 
          className="progress-bar__trashed"
          style={{width: `${trshedInPercent}%`}}
        >
        </div>
      </div>

      <div className="progress-bar__label--percent">{totalUsed}%</div>
    </div>
  )
};
