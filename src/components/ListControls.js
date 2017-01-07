let React = require('react');

module.exports = ({ saveSelected = false }) =>
  <div>
    <input type='text' />
    <button>Save { saveSelected ? 'Selected' : 'All'  } Tabs</button>
    <button>Save & Close { saveSelected ? 'Selected' : 'All'  } Tabs</button>
    <label>
      <input type="checkbox" checked={saveSelected} /> Only Save Selected Tabs</label>
  </div>;
