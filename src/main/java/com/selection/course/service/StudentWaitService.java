package com.selection.course.service;

import com.selection.course.entity.StudentWait;
import com.selection.course.repository.StudentWaitRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentWaitService {
    private final StudentWaitRepository studentWaitRepository;

    public StudentWaitService(StudentWaitRepository studentWaitRepository) {
        this.studentWaitRepository = studentWaitRepository;
    }

    // delete a student from a course waitlist
    public void deleteStudentWait (Integer studentId, Integer courseId) {
        Iterable<StudentWait> waitList = studentWaitRepository.findAll();

        Integer rmId = null;
        for (StudentWait sw : waitList) {
            if ((sw.getCourseW().getId()).equals(courseId) &&
                    (sw.getStudentW().getId()).equals(studentId)) {
                rmId = sw.getId();
                break;
            }
        }

        if (rmId != null) {
             studentWaitRepository.deleteById(rmId);
        }
    }

    public StudentWait saveStudentWait(StudentWait studentWait) {
        return studentWaitRepository.save(studentWait);
    }
}
