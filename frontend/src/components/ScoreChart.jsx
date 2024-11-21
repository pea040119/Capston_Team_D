import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ScoreCharts = ({ barTitle, lineTitle }) => {
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const [newBarName, setNewBarName] = useState('');
  const [newBarScore, setNewBarScore] = useState('');
  const [newLineName, setNewLineName] = useState('');
  const [newLineScore, setNewLineScore] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Functions for adding data to bar and line charts
  const addBarData = () => {
    if (newBarName && newBarScore) {
      setBarData([
        ...barData,
        { name: newBarName, score: parseInt(newBarScore) },
      ]);
      setNewBarName('');
      setNewBarScore('');
    }
  };

  const addLineData = () => {
    if (newLineName && newLineScore) {
      setLineData([
        ...lineData,
        { name: newLineName, score: parseInt(newLineScore) },
      ]);
      setNewLineName('');
      setNewLineScore('');
    }
  };

  const handleItemClick = (data, index, type) => {
    setEditMode(true);
    setCurrentItem({ data: { ...data }, index, type });
  };

  const saveChanges = () => {
    if (currentItem.type === 'bar') {
      const updatedData = barData.map((item, i) =>
        i === currentItem.index ? { ...currentItem.data } : item
      );
      setBarData(updatedData);
    } else {
      const updatedData = lineData.map((item, i) =>
        i === currentItem.index ? { ...currentItem.data } : item
      );
      setLineData(updatedData);
    }
    setEditMode(false);
    setCurrentItem(null);
  };

  const deleteItem = () => {
    if (currentItem.type === 'bar') {
      setBarData(barData.filter((_, i) => i !== currentItem.index));
    } else {
      setLineData(lineData.filter((_, i) => i !== currentItem.index));
    }
    setEditMode(false);
    setCurrentItem(null);
  };

  return (
    <div>
      <div className="chart">
        <div className="Bar_chart">
          <div className="ScoreCharts">
            {/* Bar Chart */}
            <h3>{barTitle}</h3>
            <ResponsiveContainer width="100%" height={185}>
              <BarChart
                data={barData}
                //   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="score"
                  fill="#82ca9d"
                  onClick={(e, index) => handleItemClick(e, index, 'bar')}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="input_box">
              <div>
                <input
                  type="text"
                  className="exam_text"
                  value={newBarName}
                  onChange={(e) => setNewBarName(e.target.value)}
                  placeholder="시험 입력"
                />
                <input
                  type="number"
                  className="exam_num"
                  value={newBarScore}
                  onChange={(e) => setNewBarScore(e.target.value)}
                  placeholder="점수 입력"
                />
                <button className="exam_button" onClick={addBarData}>
                  성적 추가
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="Line_chart">
          {/* Line Chart */}
          <h3>{lineTitle}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={(e) =>
                e &&
                handleItemClick(
                  e.activePayload[0].payload,
                  e.activeTooltipIndex,
                  'line'
                )
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>

          <div>
            <input
              type="text"
              className="exam_text"
              value={newLineName}
              onChange={(e) => setNewLineName(e.target.value)}
              placeholder="시험 입력"
            />
            <input
              type="number"
              className="exam_num"
              value={newLineScore}
              onChange={(e) => setNewLineScore(e.target.value)}
              placeholder="점수 입력"
            />
            <button className="exam_button" onClick={addLineData}>
              성적 추가
            </button>
          </div>
        </div>

        <div className="score_edit">
          {/* Edit Modal */}
          {editMode && (
            <div className="score_modal">
              {/* <h4>데이터 수정</h4> */}
              <input
                className="edit_text"
                type="text"
                value={currentItem.data.name}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    data: { ...currentItem.data, name: e.target.value },
                  })
                }
              />
              <input
                type="number"
                value={currentItem.data.score}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    data: {
                      ...currentItem.data,
                      score: parseInt(e.target.value),
                    },
                  })
                }
              />
              <div className="edit_button">
                <button onClick={saveChanges}>저장</button>
                <button onClick={deleteItem}>삭제</button>
                <button onClick={() => setEditMode(false)}>취소</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ScoreCharts;
